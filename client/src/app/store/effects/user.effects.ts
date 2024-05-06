import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as UserActions from '../actions/user.actions';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private sessionService: SessionService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    mergeMap(action => // handle effects that involve asynchronous operations like API calls and flattens the observables from multiple actions into a single observable.
      this.apiService.login(action.email, action.password)
        .pipe(
          map(response => UserActions.loginSuccess({ user: response.user, token: response.token })),
          catchError(error => of(UserActions.loginFailure({ error: error.error.message })))
        )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loginSuccess),
    tap(() => {
      console.log('Login successful');
      this.router.navigate(['/']);
    })
  ), { dispatch: false });

  AutoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.autoLogin),
    map(() => {
      const token = this.sessionService.getItem('token') as string;
      if (token) {
        return UserActions.storeToken({ token });
      } else {
        return UserActions.clearToken();
      }
    })
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    tap(() => {
      this.sessionService.removeItem('token');
      this.store.dispatch(UserActions.clearToken());
      this.router.navigate(['/']);
    })
  ), { dispatch: false });
}
