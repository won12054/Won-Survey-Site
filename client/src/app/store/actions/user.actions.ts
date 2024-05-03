import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const login = createAction(
  '[Login Component] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Home Component] Logout'
);
