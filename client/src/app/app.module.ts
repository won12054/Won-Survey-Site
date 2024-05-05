import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SurveyComponent } from './components/survey/survey.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { SupportComponent } from './components/support/support.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/reducers/user.reducers';
import { UserEffects } from './store/effects/user.effects';
import { RegistrationComponent } from './components/register/registration.component';
import { registrationReducer } from './store/reducers/registration.reducers';
import { RegistrationEffects } from './store/effects/registration.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SurveyComponent,
    AnalysisComponent,
    SupportComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({user: userReducer, registration: registrationReducer}),
    EffectsModule.forRoot([UserEffects, RegistrationEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
