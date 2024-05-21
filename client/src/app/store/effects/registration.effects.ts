import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RegistrationActions from '../actions/registration.actions';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Injectable()
export class RegistrationEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private sessionService: SessionService,
        private router: Router,
    ) {}

    register$ = createEffect(() => this.actions$.pipe(
        ofType(RegistrationActions.register),
        switchMap(action =>
            this.apiService.register(action.user).pipe(
                map(response => {
                  const user = response.user;
                  return RegistrationActions.registerSuccess({ user: user, message: 'Registration successful!' })
                }),
                catchError(error => of(RegistrationActions.registerFailure({ error: error.error.message })))
            )
        )
    ));

    registerSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(RegistrationActions.registerSuccess),
        tap((action) => {
            this.sessionService.setItem('username', action.user.username);
            this.router.navigate(['/']);
        })
    ), { dispatch: false });

    checkEmailAvailability$ = createEffect(() => this.actions$.pipe(
      ofType(RegistrationActions.checkEmailAvailability),
      switchMap(action => this.apiService.checkEmailExists(action.email).pipe(
          map(response => RegistrationActions.checkEmailAvailabilitySuccess({ isAvailable: response.isAvailable })),
          catchError(error => of(RegistrationActions.checkEmailAvailabilityFailure({ error: error.message })))
      ))
    ));

    checkUsernameAvailability$ = createEffect(() => this.actions$.pipe(
        ofType(RegistrationActions.checkUsernameAvailability),
        switchMap(action => this.apiService.checkUsernameExists(action.username).pipe(
            map(response => RegistrationActions.checkUsernameAvailabilitySuccess({ isAvailable: response.isAvailable })),
            catchError(error => of(RegistrationActions.checkUsernameAvailabilityFailure({ error: error.message })))
        ))
    ));
}
