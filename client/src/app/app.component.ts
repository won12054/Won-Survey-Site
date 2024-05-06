import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from './store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(UserActions.autoLogin());
  }
}
