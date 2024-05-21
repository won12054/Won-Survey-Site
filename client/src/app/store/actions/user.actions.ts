import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const login = createAction(
  '[Login Component] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login Component] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Login Component] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Login Component] Logout'
);
