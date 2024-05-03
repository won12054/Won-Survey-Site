import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import * as UserActions from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  genderOptions = ['Male', 'Female', 'Other'];
  countryOptions = ['United States', 'Canada', 'United Kingdom', 'Korea', 'Other'];
  educationLevels = ['High School', 'Bachelor', 'Master', 'Doctorate', 'Other'];
  ethnicities = ['White', 'Black', 'Asian', 'Hispanic', 'Other'];
  subscriptionTypes = ['Free', 'Premium', 'Enterprise'];

  constructor(private fb: FormBuilder, private store: Store, private apiService: ApiService) {
    this.registrationForm = this.fb.group({
      // username: ['', Validators.required, this.usernameValidator.bind(this)],
      email: ['', [Validators.required, Validators.email]],
      birth_date: [''],
      gender: [''],
      country: ['', Validators.required],
      occupation: [''],
      education_level: [''],
      ethnicity: [''],
      subscription_type: ['free', Validators.required]
    });
  }

  register() {
    if (this.registrationForm.valid) {
      this.store.dispatch(UserActions.register({ user: this.registrationForm.value }));
    }
  }

  // private usernameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  //   return this.apiService.checkUsernameExists(control.value).pipe(
  //     debounceTime(500),
  //     map(exists => exists ? { usernameTaken: true } : null)
  //   );
  // }
}
