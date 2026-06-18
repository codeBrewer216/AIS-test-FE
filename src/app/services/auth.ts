import {
  Injectable,
  inject,
  PLATFORM_ID,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('accessToken');
  }
  getRole(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('role');
  }
  getUser() {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  logout() {
    const token = this.getToken()
    this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      }
    ).subscribe({
      next: async (res: any) => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('role')
        localStorage.removeItem('user')
        localStorage.clear()
        this.router.navigate(['/'])
      }
    })
  }

}