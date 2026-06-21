import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-detail-comonent',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-detail-comonent.html',
  styleUrl: './ticket-detail-comonent.css',
})
export class TicketDetailComponent {
  constructor(private route: ActivatedRoute,
    private readonly bookingService: BookingService
  ) {
  }

  id = signal<string>('')
  detail = signal<any>(null)

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.id.set(id);
      this.bookingService.findOne(id).subscribe({
        next: (res) => {
          this.detail.set(res)
          console.log('res', res)
        }
      })

    } else {
      this.id.set('Not found');
    }
  }

  printTicket() {
    const id = this.id();
    if (id) {
      this.bookingService.printTicket(id).subscribe({
        next: (res) => {
          const blob = new Blob([res], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        }
      })
    }
  }
}
