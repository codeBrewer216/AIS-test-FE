import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth';

export interface seats {
  seatId: string,
  status: "booked" | "available"
}

export interface Showtime {
  screeningId: string
  room: string
  startsAt: Date
  capacity: number
  availableCount: number
  seats: seats[];
}

export interface ShowtimeResponse {
  movie: {
    "_id": string,
    "name": string,
    "type": string,
    "description": string,
    "length": number,
    "poster": string,
    "startDate": Date,
    "__v": 0,
    "endDate": Date
  },
  showtimes: Showtime[];
}

export interface Movie {
  _id?: string
  name: string,
  description: string,
  length: number,
  poster: string,
  startDate: Date,
  endDate: Date
  type: string
  rooms: string[]
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

  getList() {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  delete(id: string) {
    const accessToken = this.authService.getToken();
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        }),
      }
    );
  }

  put(id: string, movie: Movie) {
    const accessToken = this.authService.getToken();
    return this.http.put(`${this.apiUrl}/${id}`,
      movie,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        }),
      }
    )
  }

  showtimes(id: string) {
    const accessToken = this.authService.getToken();
    return this.http.get<ShowtimeResponse>(
      `${this.apiUrl}/${id}/showtimes`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
        }),
      }
    )
  }
}
