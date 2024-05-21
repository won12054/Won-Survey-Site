import { Question } from './question.model';

export interface Survey {
  _id?: string;
  title: string;
  description?: string;
  is_public: boolean;
  author: {
    _id: string;
    username: string;
  };
  questions: Question[];
  start_date: Date;
  end_date: Date;
  is_active: boolean;
}
