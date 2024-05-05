import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RegistrationActions from '../actions/registration.actions';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Injectable()
export class RegistrationEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private router: Router
    ) {}

    register$ = createEffect(() => this.actions$.pipe(
        ofType(RegistrationActions.register),
        mergeMap(action =>
            this.apiService.register(action.user).pipe(
                map(response => RegistrationActions.registerSuccess({ message: 'Registration successful!' })),
                catchError(error => of(RegistrationActions.registerFailure({ error: error.error.message })))
            )
        )
    ));

    registerSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(RegistrationActions.registerSuccess),
        tap(() => {
            this.router.navigate(['/login']);
        })
    ), { dispatch: false });

    checkUsernameAvailability$ = createEffect(() => this.actions$.pipe(
      ofType(RegistrationActions.checkUsernameAvailability),
      mergeMap(action =>
        this.apiService.checkUsernameExists(action.username).pipe(
          map(result => result.isAvailable ?
            RegistrationActions.checkUsernameAvailabilitySuccess({ isAvailable: true }) :
            RegistrationActions.checkUsernameAvailabilitySuccess({ isAvailable: false })),
          catchError(error => of(RegistrationActions.checkUsernameAvailabilityFailure({ error })))
        )
      )
    ));

    // Effect for checking email availability
    checkEmailAvailability$ = createEffect(() => this.actions$.pipe(
      ofType(RegistrationActions.checkEmailAvailability),
      mergeMap(action =>
        this.apiService.checkEmailExists(action.email).pipe(
          map(result => result.isAvailable ?
            RegistrationActions.checkEmailAvailabilitySuccess({ isAvailable: true }) :
            RegistrationActions.checkEmailAvailabilitySuccess({ isAvailable: false })),
          catchError(error => of(RegistrationActions.checkEmailAvailabilityFailure({ error })))
        )
      )
    ));
}
