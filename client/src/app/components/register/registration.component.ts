import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, first, map, of, switchMap, take, tap, timeout, timer } from 'rxjs';
import * as RegistrationActions from 'src/app/store/actions/registration.actions';
import { selectIsEmailAvailable, selectIsUsernameAvailable } from 'src/app/store/selectors/registration.selectors';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  today: string;
  submitted: boolean = false;

  isUsernameAvailable$: Observable<boolean>;
  isEmailAvailable$: Observable<boolean>;


  genderOptions = ['Male', 'Female', 'Transgender Male', 'Transgender Female', 'Genderqueer', 'Non-Binary', 'Two-Spirit', 'Intersex', 'Agender', 'Other'];
  countryOptions = ['Argentina', 'Australia', 'Brazil', 'Canada', 'Egypt', 'Ethiopia', 'France', 'Italy', 'Korea', 'Japan', 'New Zealand', 'United States', 'Other'];
  educationLevels = ['No Formal Education', 'Completed Primary School', 'High School Diploma', 'Trade/Technical/Vocational Training', 'Associate Degree', 'Bachelor’s Degree', 'Master’s Degree', 'Professional Degree', 'Doctorate Degree', 'Other'];
  ethnicities = ['Asian', 'Black', 'Hispanic', 'White', 'Middle Eastern', 'Native American / Indigenous', 'Pacific Islander', 'South Asian', 'Southeast Asian', 'Mixed Ethnicity', 'Other'];
  subscriptionTypes = ['Free', 'Premium', 'Enterprise'];

  constructor(private fb: FormBuilder, private store: Store) {
    const now = new Date();
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
    this.isUsernameAvailable$ = this.store.select(selectIsUsernameAvailable);
    this.isEmailAvailable$ = this.store.select(selectIsEmailAvailable);
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], this.emailValidator()],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required], this.passwordMatchValidator()],
      username: ['', [Validators.required], this.usernameValidator()],
      birth_date: ['', [Validators.required, this.dateValidator()]],
      country: ['', Validators.required],
      gender: [''],
      occupation: [''],
      education_level: [''],
      ethnicity: [''],
      subscription_type: ['Free', Validators.required]
    });
  }


  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (!value) {
            return of(null);
          }
          this.store.dispatch(RegistrationActions.checkEmailAvailability({ email: value }));

          return timer(100).pipe(
            switchMap(() => this.isEmailAvailable$),
            filter(isAvailable => isAvailable !== null),  // ensure we get a non-null response
            take(1),
            timeout(1000),  // add a timeout to ensure you're not stuck waiting indefinitely
            map(isAvailable => {
              const validationOutcome = isAvailable ? null : { emailTaken: true };
              return validationOutcome;
            }),
            catchError(_ => {
              return of({ emailTaken: true });
            })
          );
        }),
        first(),
        catchError(_ => {
          return of({ emailTaken: true });
        })
      );
    };
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (!value) {
            return of(null);
          }
          this.store.dispatch(RegistrationActions.checkUsernameAvailability({ username: value }));

          return timer(100).pipe(
            switchMap(() => this.isUsernameAvailable$),
            filter(isAvailable => isAvailable !== null),
            take(1),
            map(isAvailable => {
              const validationOutcome = isAvailable ? null : { usernameTaken: true };
              return validationOutcome;
            }),
            catchError(_ => {
              return of({ usernameTaken: true });
            })
          );
        }),
        first(),
        catchError(_ => {
          return of({ usernameTaken: true });
        })
      );
    };
  }


  passwordMatchValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.parent || !control.parent.get('password') || !control.parent.get('confirm_password')) {
        return of(null);
      }

      const password = control.parent.get('password').value;
      const confirmPassword = control.parent.get('confirm_password').value;

      if (password !== confirmPassword) {
        return of({ mismatch: true });
      }
      return of(null);
    };
  }


  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(control.value);

      if (isNaN(inputDate.getTime())) {
        return { invalidDate: true };
      }

      if (inputDate > today) {
        return { futureDate: true };
      }

      const earliestDate = new Date('1900-01-01');
      if (inputDate < earliestDate) {
        return { tooEarly: true };
      }

      return null;
    };
  }

  register() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.store.dispatch(RegistrationActions.register({ user: this.registrationForm.getRawValue() }));
    }
  }
}
