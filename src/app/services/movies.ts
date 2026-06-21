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



// curl -X 'GET' \
//   'http://localhost:8000/movies/6a329df7276ccc5880e8c431/showtimes' \
//   -H 'accept: */*' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJzdWIiOiI2YTMyNmZjMTkzZDkxMmUxZGJlNWEzZjciLCJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE3ODE4NTM0NDksImV4cCI6MTc4MTkzOTg0OX0.fzQfEx6sKfvufCAf8r5jSfBNniENykZgAc2253XFGg8'