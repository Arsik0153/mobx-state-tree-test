import type { NextApiRequest, NextApiResponse } from 'next'

const questions = [
  {
    id: '1',
    type: 'text',
    title: 'Text question',
    correct_text: 'Correct text',
  },
  {
    id: '2',
    type: 'one',
    title: 'One answer question',
    options: [
      {
        id: '1',
        text: 'Option 1',
      },
      {
        id: '2',
        text: 'Option 2',
      },
      {
        id: '3',
        text: 'Option 3',
      },
    ],
    correct_option_id: '2',
  },
  {
    id: '3',
    type: 'multiple',
    title: 'Multiple answer question',
    options: [
      {
        id: '1',
        text: 'Option 1',
        is_correct: false,
      },
      {
        id: '2',
        text: 'Option 2',
        is_correct: true,
      },
      {
        id: '3',
        text: 'Option 3',
        is_correct: true,
      },
    ],
  },
  {
    id: '4',
    type: 'video',
    title: 'Video question',
  },
  {
    id: '5',
    type: 'photo',
    title: 'Photo question',
  },
];

type Question = typeof questions[0];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question[]>
) {
  res.status(200).json(questions)
}
