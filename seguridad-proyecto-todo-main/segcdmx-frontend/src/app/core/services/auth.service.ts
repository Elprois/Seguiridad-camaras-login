import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'segcdmx_token';
  private readonly apiUrl = 'http://localhost:3000/auth/login';
  private readonly userKey = 'segcdmx_user';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          const decoded: any = jwtDecode(response.token);
          localStorage.setItem(this.userKey, JSON.stringify({
            username: decoded.username,
            role: decoded.role,
            id: decoded.id
          }));
        }
      }),
      map(() => true),
      catchError(error => {
        console.error('Login failed', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    // TODO: Check token expiration
    return !!token;
  }

  isAdmin(): boolean {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return false;
    try {
      const user = JSON.parse(userStr);
      return user.role === 'admin';
    } catch {
      return false;
    }
  }

  getUser(): any {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }
}
