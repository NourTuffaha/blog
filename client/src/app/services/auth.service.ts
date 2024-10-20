import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  logout(): void {
    localStorage?.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage?.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage?.getItem('token');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log({decodedToken})
      return decodedToken.userId; 
    }
    return null;
  }

  getUserProfile(userId: string): Observable<any> {
  return this.http.get<any>(`http://localhost:5000/api/users/${userId}/profile`);
}
}
