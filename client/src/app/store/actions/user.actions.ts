import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const login = createAction(
  '[Login Component] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login Component] Login Success',
  props<{ user: User, token: string }>()
);

export const autoLogin = createAction(
  '[Login Component] Auto Login',
);

export const storeToken = createAction(
  '[Login Component] Store Token',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Login Component] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Login Component] Logout'
);

export const clearToken = createAction(
  '[Login Component] Clear Token'
)

export const updateUser = createAction(
  '[Login Component] Update User',
  props<{ user: User }>()
);
