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
  '[Home Component] Logout'
);

export const register = createAction(
  '[Registration Component] Register',
  props<{ user: User }>()
)

export const registerSuccess = createAction(
  '[Registration Component] Register Success',
  props<{ message: string}>()
)

export const registerFailure = createAction(
  '[Registration Component] Register Failure',
  props<{ error: string }>()
)
