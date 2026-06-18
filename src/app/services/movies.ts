import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth';
import { isPlatformBrowser } from '@angular/common';

export interface Movie {
  name: string,
  description: string,
  duration: number,
  poster: string,
  startDate: Date,
  endDate: Date
  type: string
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/movies`;

  create(data: Movie) {
    const accessToken = this.authService.getToken();
    return this.http.post(
      this.apiUrl,
      data,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        }),
      }
    );
  }
}