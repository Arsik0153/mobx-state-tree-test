import { api } from '@/utils/api';
import { toBase64 } from '@/utils/helpers';
import axios from 'axios';
import { Instance, flow, types } from 'mobx-state-tree';

const BaseQuestion = types.model('BaseQuestion', {
  id: types.string,
  type: types.enumeration('QuestionType', ['text', 'one', 'multiple', 'video', 'photo']),
  title: types.string,
});

const TextQuestion = BaseQuestion.named('TextQuestion').props({
  correct_text: types.string,
});

const OneAnswerQuestion = BaseQuestion.named('OneAnswerQuestion').props({
  correct_option_id: types.string,
  options: types.array(
    types.model({
      id: types.string,
      text: types.string,
    })
  ),
});

const MultiplAnswerQuestion = BaseQuestion.named('MultiplAnswerQuestion').props({
  options: types.array(
    types.model({
      id: types.string,
      text: types.string,
      is_correct: types.boolean,
    })
  ),
});

const QuestionModel = types.union(TextQuestion, OneAnswerQuestion, MultiplAnswerQuestion);

export { BaseQuestion, TextQuestion, OneAnswerQuestion, MultiplAnswerQuestion, QuestionModel };

export type Question = Instance<typeof QuestionModel>;

export const QuestionStore = types.model('QuestionStore', {
  questions: types.array(QuestionModel),
  state: types.enumeration('State', ['pending', 'done', 'error']),
  uploadState: types.enumeration('UploadState', ['pending', 'done', 'error']),
}).actions(self => ({
  fetchQuestions: flow(function* fetchQuestions() {
    self.state = 'pending';
    try {
      const response = yield api.get('/api/questions');
      self.questions = response.data;
      self.state = 'done';
    } catch (error) {
      console.error('Failed to fetch projects', error);
      self.state = 'error';
    }
  }),
  uploadFile: flow(function* uploadFile(file: File) {
    self.uploadState = 'pending';
    const base64 = yield toBase64(file);

    try {
      const formData = new FormData();
      formData.append('source', base64);

      yield axios.post(process.env.UPLOAD_URL || '', formData, {
        params: {
          key: process.env.UPLOAD_KEY || '',
          format: 'json',
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      self.uploadState = 'done';
    } catch (error) {
      console.error('Error uploading file', error);
      self.uploadState = 'error';
    }
  }),
}));