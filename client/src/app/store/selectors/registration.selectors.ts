import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { RegistrationState } from '../reducers/registration.reducers';

export const selectRegistrationState = (state: AppState) => state.registration

export const selectIsUsernameAvailable = createSelector(
  selectRegistrationState,
  (state: RegistrationState) => state.usernameAvailable
);

export const selectIsEmailAvailable = createSelector(
  selectRegistrationState,
  (state: RegistrationState) => state.emailAvailable
);

export const selectRegistrationError = createSelector(
  selectRegistrationState,
  (state: RegistrationState) => state.error
);

