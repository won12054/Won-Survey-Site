import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  user: any | null;
  isAuthenticated: boolean;
  error: any | null;
}

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    isAuthenticated: true,
    error: null
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    error: error,
    isAuthenticated: false
  })),
  on(UserActions.logout, state => ({
    ...state,
    user: null,
    isAuthenticated: false
  }))
);
