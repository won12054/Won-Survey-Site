import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.displayHome().subscribe((data) => {
      console.log(data);
    });
  }
}
