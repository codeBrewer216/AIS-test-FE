import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ticketLists } from '../pages/ticket/ticket';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
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

  user() {
    const accessToken = this.authService.getToken();
    return this.http.get<ticketLists[]>(`${this.apiUrl}/user`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      }),
    })
  }

  findOne(id: string) {
    const accessToken = this.authService.getToken();
    return this.http.get<ticketLists>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      }),
    })
  }

  printTicket(id: string) {
    const accessToken = this.authService.getToken();
    return this.http.get(`${this.apiUrl}/${id}/export-pdf`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      }),
      responseType: 'blob'
    })
  }
}