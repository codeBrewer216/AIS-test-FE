import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie, MoviesService, seats, ShowtimeResponse } from '../../services/movies';
import { BookingService } from '../../services/booking';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  private moviesService = inject(MoviesService);
  private bookingService = inject(BookingService)
  private router = inject(Router);

  showtimes = ['10:00', '14:00', '18:00'];
  rows = ['A', 'B', 'C', 'D', 'E'];
  seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  moviesList = signal<Movie[]>([]);
  selectedRoom = signal<string>('')
  selectedMovie = signal<Movie | null>(null);
  selectedShowtime = signal<string | null>(null);
  selectedSeats = signal<string[]>([]);
  showConfirmModal = signal(false);
  seatDetail = signal<seats[]>([])
  notification = signal<{
    message: string;
    visible: boolean;
    type?: 'success' | 'error' | 'info';
  }>({
    message: '',
    visible: false,
    type: 'success',
  });

  ngOnInit() {
    this.moviesService.getList().subscribe({
      next: (res: Movie[]) => {
        this.moviesList.set(res);
      },
    });
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.notification.set({
      message,
      visible: true,
      type,
    });
    setTimeout(() => {
      this.notification.update((n) => ({
        ...n,
        visible: false,
      }));
    }, 5000);
  }

  selectShowTime(time: string) {
    if (this.selectedShowtime() === time) {
      this.selectedShowtime.set(null)
      this.selectedSeats.set([]);
      return;
    }
    this.selectedShowtime.set(time);
    this.checkShowTimeSeat()
  }


  selectMovie(movie: Movie) {
    const currentMovie = this.selectedMovie();
    if (currentMovie?._id === movie._id) {
      this.selectedMovie.set(null);
      this.selectedShowtime.set(null)
      this.selectedSeats.set([]);
      return;
    }
    this.selectedMovie.set(movie);
    this.selectedShowtime.set(null)
    this.selectedSeats.set([]);
    this.checkShowTimeSeat()
  }

  toggleSeat(seatCode: string) {
    // Ignore clicks on already booked seats
    if (this.isSeatBooked(seatCode)) return;

    const seats = this.selectedSeats();

    if (seats.includes(seatCode)) {
      this.selectedSeats.set(
        seats.filter((seat) => seat !== seatCode)
      );
    } else {
      this.selectedSeats.set([...seats, seatCode]);
    }
  }

  isSeatSelected(seatCode: string): boolean {
    return this.selectedSeats().includes(seatCode);
  }

  isSeatBooked(seatCode: string): boolean {
    return this.seatDetail().some((s) => s.seatId === seatCode && s.status === 'booked');
  }

  openReserveModal() {
    if (this.selectedSeats().length === 0) {
      return;
    }

    this.showConfirmModal.set(true);
  }

  closeReserveModal() {
    this.showConfirmModal.set(false);
  }
  confirmReservation() {

    const payload = {
      movieId: this.selectedMovie()?._id,
      seats: this.selectedSeats(),
      room: this.selectedRoom(),
    };
    const bookingPayload = {
      rooms:
        this.selectedMovie()?.rooms[0] ??
        '', movieId: payload.movieId ?? '', seatIds: payload.seats, startsAt: this.selectedShowtime() ?? ''
    };

    this.booking(bookingPayload).subscribe({
      next: (res) => {
        this.showNotification(
          `Booking Success\nMovie: ${this.selectedMovie()?.name}\nSeats: ${this.selectedSeats().join(', ')}`
        );
        this.showConfirmModal.set(false);
        this.selectedSeats.set([]);
        this.checkShowTimeSeat();
        setTimeout(() => {
          this.router.navigate(['/ticket']);
        }, 3000);
      },
      error: (err) => {
        const msg = err && err.error && err.error.message ? err.error.message : (err && err.message ? err.message : 'Booking failed');
        this.showNotification(msg);
        console.error(err);
      }
    });
  }

  checkShowTimeSeat() {
    if (this.selectedMovie()) {
      this.moviesService
        .showtimes(this.selectedMovie()?._id ?? '')
        .subscribe({
          next: (res: ShowtimeResponse) => {
            this.selectedRoom.set(res.showtimes[0].room)
            switch (this.selectedShowtime()) {
              case '10:00': {
                const today = new Date().toDateString();
                const showtime = res.showtimes.find((s) => {
                  const startDate = new Date(s.startsAt);
                  return (
                    startDate.getUTCHours() === 3 &&
                    startDate.toDateString() === today
                  );
                });

                this.seatDetail.set(showtime?.seats ?? []);
                return;
              }

              case '14:00': {
                const today = new Date().toDateString();
                const showtime = res.showtimes.find((s) => {
                  const startDate = new Date(s.startsAt);
                  return (
                    startDate.getUTCHours() === 7 &&
                    startDate.toDateString() === today
                  );
                });

                this.seatDetail.set(showtime?.seats ?? []);
                return;
              }

              case '18:00': {
                const today = new Date().toDateString();
                const showtime = res.showtimes.find((s) => {
                  const startDate = new Date(s.startsAt);
                  return (
                    startDate.getUTCHours() === 11 &&
                    startDate.toDateString() === today
                  );
                });

                this.seatDetail.set(showtime?.seats ?? []);
                return;
              }
              default:
                return
            }

          },
        });
    }
  }

  booking(dtp: { rooms: string, movieId: string, seatIds: Array<string>, startsAt: string }) {
    return this.bookingService.booking(dtp);
  }
}