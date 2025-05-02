import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import action from "../helper/action";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = action.apiUrl + 'signin';


  constructor(private http: HttpClient, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { }



  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        const token = response.token;
        console.log(token)
        if (token && this.isBrowser()) {
          localStorage.setItem("auth-token", token);
          localStorage.setItem("username", username);
          this.router.navigate(['/overview']);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("username");
    }
    this.router.navigate(['/signin']);
  }
  getLoggedInUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  isAuthenticated(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem("auth-token");
    }
    return false;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
