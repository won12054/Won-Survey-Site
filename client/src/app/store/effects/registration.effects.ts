import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RegistrationActions from '../actions/registration.actions';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { Store } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class RegistrationEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private sessionService: SessionService,
        private router: Router,
        private store: Store
    ) {}

    register$ = createEffect(() => this.actions$.pipe(
        ofType(RegistrationActions.register),
        mergeMap(action =>
            this.apiService.register(action.user).pipe(
                map(response => {
                  const token = response.token;
                  return RegistrationActions.registerSuccess({ message: 'Registration successful!', token: token })
                }),
                catchError(error => of(RegistrationActions.registerFailure({ error: error.error.message })))
            )
        )
    ));

    registerSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(RegistrationActions.registerSuccess),
        tap((action) => {
            this.sessionService.setItem('token', action.token);
            this.store.dispatch(UserActions.storeToken({ token: action.token }));
            this.router.navigate(['/']);
        })
    ), { dispatch: false });

    // registerSuccess$ = createEffect(() => this.actions$.pipe(
    //   ofType(RegistrationActions.registerSuccess),
    //   concatMap((action) => {
    //     this.sessionService.setItem('token', action.token);
    //     this.store.dispatch(RegistrationActions.registerSuccess({ message: action.message, token: action.token }));

    //     return this.apiService.getUserInfo(action.token).pipe(
    //       map((user) => {
    //         return UserActions.loginSuccess({ user, token: action.token });
    //       }),
    //       catchError((error) => {
    //         console.error('Failed to fetch user information:', error);
    //         return of(UserActions.loginFailure({ error }));
    //       }),
    //       tap(() => {
    //         this.router.navigate(['/']);
    //       })
    //     );
    //   })
    // ));

    checkEmailAvailability$ = createEffect(() => this.actions$.pipe(
      ofType(RegistrationActions.checkEmailAvailability),
      mergeMap(action => this.apiService.checkEmailExists(action.email).pipe(
          map(result => RegistrationActions.checkEmailAvailabilitySuccess({ isAvailable: result.isAvailable })),
          catchError(error => of(RegistrationActions.checkEmailAvailabilityFailure({ error: error.message })))
      ))
    ));

    checkUsernameAvailability$ = createEffect(() => this.actions$.pipe(
        ofType(RegistrationActions.checkUsernameAvailability),
        mergeMap(action => this.apiService.checkUsernameExists(action.username).pipe(
            map(result => RegistrationActions.checkUsernameAvailabilitySuccess({ isAvailable: result.isAvailable })),
            catchError(error => of(RegistrationActions.checkUsernameAvailabilityFailure({ error: error.message })))
        ))
    ));
}
