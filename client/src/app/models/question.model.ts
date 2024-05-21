import { Answer } from './answer.model';

export interface Question {
  _id?: string;
  text: string;
  type: 'text' | 'multipleChoice';
  options?: {
    text: string;
    isCorrect: boolean;
  }[];
  answer: Answer[];
}
