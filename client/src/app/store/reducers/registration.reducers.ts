import { createReducer, on } from "@ngrx/store";
import * as RegistrationActions from "../actions/registration.actions";

export interface RegistrationState {
  usernameAvailable: boolean | null;
  emailAvailable: boolean | null;
  message: string | null;
  error: string | null;
}

export const initialRegistrationState: RegistrationState = {
  usernameAvailable: null,
  emailAvailable: null,
  message: null,
  error: null
}

export const registrationReducer = createReducer(
  initialRegistrationState,
  on(RegistrationActions.registerSuccess, (state, { message }) => ({
      ...state,
      message: message,
      error: null
  })),
  on(RegistrationActions.registerFailure, (state, { error }) => ({
      ...state,
      error: error,
      message: null
  })),
  on(RegistrationActions.checkUsernameAvailabilitySuccess, (state, { isAvailable }) => ({
    ...state,
    usernameAvailable: isAvailable,
    error: null
  })),
  on(RegistrationActions.checkEmailAvailabilitySuccess, (state, { isAvailable }) => ({
    ...state,
    emailAvailable: isAvailable,
    error: null
  })),
  on(RegistrationActions.checkUsernameAvailabilityFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(RegistrationActions.checkEmailAvailabilityFailure, (state, { error }) => ({
    ...state,
    error: error
  }))
);





