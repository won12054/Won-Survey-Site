import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Survey } from 'src/app/models/survey.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  surveys: Survey[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.apiService.getSurveys().pipe(
      catchError(error => {
        console.error('Error fetching surveys', error);
        return of([]);
      })
    ).subscribe({
      next: (data: Survey[]) => {
        this.surveys = data;
      },
      error: (error) => {
        console.error('Error fetching surveys', error);
      }
    });
  }


}
