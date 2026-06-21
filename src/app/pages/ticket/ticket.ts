import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking';
import { seats } from '../../services/movies';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface userId {
  _id: string,
  username: string,
  email: string
}

export interface ticketLists {
  _id: string
  screeningId: string
  room: string
  startsAt: Date
  movieId: {
    _id: string,
    name: string,
  }
  seats: seats[],
  userId: userId
  status: string
  createdAt: Date,
  updatedAt: Date,
  "__v": number
}

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.css'],
})
export class Ticket {
  constructor(
    private router: Router
  ) { }
  private bookingService: BookingService = inject(BookingService);

  ticketList = signal<ticketLists[]>([])
  ngOnInit() {
    this.bookingService.user().subscribe({
      next: (res: ticketLists[]) => {
        const parsed = res.map(r => ({ ...r, startsAt: new Date(r.startsAt as unknown as string) }));
        this.ticketList.set(parsed);
      }
    })
  }
  viewDetail(ticketId: string) {
    this.router.navigate(['/ticket', ticketId]);
  }
}
