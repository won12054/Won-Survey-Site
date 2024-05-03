import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/app.state';
import { selectIsAuthenticated } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }

  onLogout() {
    this.store.dispatch(UserActions.logout());
    this.router.navigate(['/login']);
  }

}
