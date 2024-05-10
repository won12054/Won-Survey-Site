import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const register = createAction(
  '[Registration Component] Register',
  props<{ user: User }>()
)

export const registerSuccess = createAction(
  '[Registration Component] Register Success',
  props<{ user: User, message: string, token: string }>()
)

export const registerFailure = createAction(
  '[Registration Component] Register Failure',
  props<{ error: string }>()
)

export const clearToken = createAction(
  '[Registration Component] Clear Token',
)

export const checkEmailAvailability = createAction(
  '[Registration Component] Check Email Availability',
  props<{ email: string }>()
);

export const checkEmailAvailabilitySuccess = createAction(
  '[Registration Component] Check Email Availability Success',
  props<{ isAvailable: boolean }>()
);

export const checkEmailAvailabilityFailure = createAction(
  '[Registration Component] Check Email Availability Failure',
  props<{ error: any }>()
);

export const checkUsernameAvailability = createAction(
  '[Registration Component] Check Username Availability',
  props<{ username: string }>()
);

export const checkUsernameAvailabilitySuccess = createAction(
  '[Registration Component] Check Username Availability Success',
  props<{ isAvailable: boolean }>()
);

export const checkUsernameAvailabilityFailure = createAction(
  '[Registration Component] Check Username Availability Failure',
  props<{ error: any }>()
);


