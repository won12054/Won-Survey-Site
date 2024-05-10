import { createSelector } from "@ngrx/store";
import { AppState } from '../app.state';

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  userState => userState.user
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  userState => userState.isAuthenticated
);

export const selectError = createSelector(
  selectUserState,
  userState => userState.error
);

export const selectToken = createSelector(
  selectUserState,
  userState => userState.token
);
