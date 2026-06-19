import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Booking {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/bookings`;

  booking(data: { rooms: string, movieId: string, seatIds: Array<string>, startsAt: string }) {
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

// curl - X 'POST' \
// 'http://localhost:8000/bookings' \
// -H 'accept: */*' \
// -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJzdWIiOiI2YTMyNmZjMTkzZDkxMmUxZGJlNWEzZjciLCJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE3ODE4NTM0NDksImV4cCI6MTc4MTkzOTg0OX0.fzQfEx6sKfvufCAf8r5jSfBNniENykZgAc2253XFGg8' \
// -H 'Content-Type: application/json' \
// -d '{
// "rooms": "room-1",
//   "movieId": "6a329df7276ccc5880e8c431",
//     "seatIds": [
//       "A1",
//       "A2"
//     ],
//       "startsAt": "10.00"
// }'