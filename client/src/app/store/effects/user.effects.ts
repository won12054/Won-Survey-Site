import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
    switchMap(action =>
      this.apiService.login(action.email, action.password)
        .pipe(
          map(response => UserActions.loginSuccess({ user: response.user, token: response.token })),
          catchError(error => of(UserActions.loginFailure({ error: error.error.message })))
        )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loginSuccess),
    tap((action) => {
      this.sessionService.setItem('username', action.user.username);
      this.router.navigate(['/']);
    })
  ), { dispatch: false });

  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.autoLogin),
    switchMap(() => this.apiService.autoLogin().pipe(
      map(response => {
        this.sessionService.setItem('username', response.user.username);
        return UserActions.storeToken({ token: 'validated' });
      })
    )),
    catchError(error => {
      console.log('Session validation failed', error);
      return of(UserActions.loginFailure({ error: 'Auto login failed' }));
    })

  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    tap(() => {
      this.sessionService.removeItem('username');
      this.router.navigate(['/']);
    })
  ), { dispatch: false });
}
