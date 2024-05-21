import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as UserActions from '../actions/user.actions';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private sessionService: SessionService,
    private router: Router,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    switchMap(action =>
      this.apiService.login(action.email, action.password)
        .pipe(
          map(response => UserActions.loginSuccess({ user: response.user })),
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

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    tap(() => {
      this.sessionService.removeItem('username');
      this.router.navigate(['/']);
    })
  ), { dispatch: false });
}
