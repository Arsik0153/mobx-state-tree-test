import React from 'react'
import { Card, CardContent, Checkbox, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { MultiplAnswerQuestion, Question } from '@/models/QuestionStore';
import { OneAnswerQuestion } from '@/models/QuestionStore';
import { Instance } from 'mobx-state-tree';
import FileUploadZone from './FileUploadZone';
import { useStore } from '@/models/RootStore';
import { observer } from 'mobx-react-lite';

type Props = {
  question: Question;
  count: number;
}

const QuestionView: React.FC<Props> = observer((props) => {
  const { question, count } = props;
  const { questionStore } = useStore();

  const handleFileUpload = (file: File) => {
    questionStore.uploadFile(file);
  }

  if (question.type === 'text') {
    return (
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }} variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>{count}. {question.title}</Typography>
            <TextField fullWidth label="Answer" variant="outlined" />
          </CardContent>
        </Card>
      </Grid>
    )
  }

  if (question.type === 'one') {
    const oneAnswerQuestion = question as Instance<typeof OneAnswerQuestion>;
    return (
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }} variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>{count}. {question.title}</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {oneAnswerQuestion.options.map((option) => (
                <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.text} />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  if (question.type === 'multiple') {
    const multipleAnswerQuestion = question as Instance<typeof MultiplAnswerQuestion>;
    return (
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }} variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>{count}. {question.title}</Typography>
            <FormGroup>
              {multipleAnswerQuestion.options.map(option => (
                <FormControlLabel key={option.id} control={<Checkbox />} label={option.text} />
              ))}
            </FormGroup>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  if (question.type === 'video') {
    return (
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }} variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>{count}. {question.title}</Typography>
            <Typography variant="caption" gutterBottom>Video answers are not supported yet</Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  if (question.type === 'photo') {
    return (
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }} variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>{count}. {question.title}</Typography>
            <FileUploadZone onFileUpload={handleFileUpload} />
          </CardContent>
        </Card>
      </Grid>
    )
  }

  return null;
});

export default QuestionView