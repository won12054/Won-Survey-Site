import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/app.state';
import { selectError } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage$: Observable<string>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.errorMessage$ = this.store.pipe(select(selectError));
  }

  login() {
    if (!this.email || !this.password) {
      return;
    }
    this.store.dispatch(UserActions.login({ email: this.email, password: this.password}));
  }
}
