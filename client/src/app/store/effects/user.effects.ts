import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as UserActions from '../actions/user.actions';
import { LoginResponse } from 'src/app/interfaces/login-response.interface';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    mergeMap(action =>
      this.apiService.login(action.email, action.password)
        .pipe(
          map(response => UserActions.loginSuccess({ user: response.user })),
          catchError(error => of(UserActions.loginFailure({ error })))
        )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loginSuccess),
    tap(() => {
      console.log('Login successful');
      this.router.navigate(['/home']);
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router
  ) {}
}
