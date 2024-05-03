import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/app.state';
import { selectIsAuthenticated, selectUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user$: Observable<any>;
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(selectUser));
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }

  onLogout() {
    this.store.dispatch(UserActions.logout());
  }
}
