import { ActionReducerMap } from "@ngrx/store";
import { UserState, userReducer } from "./reducers/user.reducers";
import { RegistrationState, registrationReducer } from "./reducers/registration.reducers";

export interface AppState {
  user: UserState;
  registration: RegistrationState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  registration: registrationReducer
};
