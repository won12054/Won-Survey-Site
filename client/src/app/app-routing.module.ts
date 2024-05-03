import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './components/survey/survey.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { SupportComponent } from './components/support/support.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'support', component: SupportComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
