import { User } from '../models/user.model';

export interface LoginResponse {
  message: string;
  user: User;
}
