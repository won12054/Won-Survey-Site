import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import * as RegistrationActions from 'src/app/store/actions/registration.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  genderOptions = ['Male', 'Female', 'Transgender Male', 'Transgender Female', 'Genderqueer', 'Non-Binary', 'Two-Spirit', 'Intersex', 'Agender', 'Other'];
  countryOptions = ['Argentina', 'Australia', 'Brazil', 'Canada', 'Egypt', 'Ethiopia', 'France', 'Italy', 'Korea', 'Japan', 'New Zealand', 'United States', 'Other'];
  educationLevels = ['No Formal Education', 'Completed Primary School', 'High School Diploma', 'Trade/Technical/Vocational Training', 'Associate Degree', 'Bachelor’s Degree', 'Master’s Degree', 'Professional Degree', 'Doctorate Degree', 'Other'];
  ethnicities = ['Asian', 'Black', 'Hispanic', 'White', 'Middle Eastern', 'Native American / Indigenous', 'Pacific Islander', 'South Asian', 'Southeast Asian', 'Mixed Ethnicity', 'Other'];
  subscriptionTypes = ['Free', 'Premium', 'Enterprise'];

  constructor(private fb: FormBuilder, private store: Store, private apiService: ApiService) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(8)],
      confirm_password: ['', [Validators.required]],
      username: ['', Validators.required],
      birth_date: [''],
      gender: [''],
      country: ['', Validators.required],
      occupation: [''],
      education_level: [''],
      ethnicity: [''],
      subscription_type: ['free', Validators.required]
    }), {
      validator: this.passwordMatchValidator
    };
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirm_password'].value ? null : { mismatch: true };
  }

  register() {
    if (this.registrationForm.valid) {
      this.store.dispatch(RegistrationActions.register({ user: this.registrationForm.value }));
    }
  }

  // private usernameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  //   return this.apiService.checkUsernameExists(control.value).pipe(
  //     debounceTime(500),
  //     map(exists => exists ? { usernameTaken: true } : null)
  //   );
  // }
}
