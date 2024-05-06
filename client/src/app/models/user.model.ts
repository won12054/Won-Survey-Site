export interface User {
  _id: string;
  username: string;
  email: string;
  country: string;
  birth_date: Date;
  gender?: string;
  occupation?: string;
  education_level?: string;
  ethnicity?: string;
  registration_date: Date;
  last_login: Date;
  login_count: number;
  subscription_type: 'free' | 'premium' | 'enterprise';
}
