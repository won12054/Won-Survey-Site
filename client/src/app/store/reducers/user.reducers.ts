import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from 'src/app/models/user.model';
import { state } from '@angular/animations';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  error: any | null;
}

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  token: null,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user: user,
    isAuthenticated: true,
    token: token,
    error: null
  })),
  on(UserActions.storeToken, (state, { token }) => ({
    ...state,
    token: token,
    isAuthenticated: true
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    error: error,
    isAuthenticated: false
  })),
  on(UserActions.logout, state => ({
    ...state,
    user: null,
    isAuthenticated: false,
    token: null
  })),
  on(UserActions.clearToken, state => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false
  })),
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    user: user
  }))
);
