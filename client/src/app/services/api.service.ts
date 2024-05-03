import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/auth/login`, { email, password });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/register`, user);
  }

  getUserInfo(userId: string) {
    return this.http.get<{user: any, message: string}>(`${this.baseUrl}/api/users/${userId}`);
  }
}
