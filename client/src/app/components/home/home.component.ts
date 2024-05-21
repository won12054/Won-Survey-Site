import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import * as UserActions from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/app.state';
import { selectIsAuthenticated, selectUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username: string | null = null;
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated))
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  onLogout() {
    this.store.dispatch(UserActions.logout());
  }
}
