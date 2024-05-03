import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UserState } from 'src/app/store/reducers/user.reducers';
import * as UserActions from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user$: Observable<any>;
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<{ user: UserState }>) {
    this.user$ = this.store.pipe(select(state => state.user.user));
    this.isAuthenticated$ = this.store.pipe(select(state => state.user.isAuthenticated));
  }

  onLogout() {
    this.store.dispatch(UserActions.logout());
  }
}
