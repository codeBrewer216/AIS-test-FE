import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie, MoviesService } from '../../services/movies';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  private moviesService = inject(MoviesService);
  showtimes = ['10:00', '14:00', '18:00'];
  rows = ['A', 'B', 'C', 'D', 'E'];
  seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  moviesList = signal<Movie[]>([]);
  selectedMovie = signal<Movie | null>(null);
  selectedShowtime = signal<string | null>(null);
  selectedSeats = signal<string[]>([]);
  showConfirmModal = signal(false);


  ngOnInit() {
    this.moviesService.getList().subscribe({
      next: (res: Movie[]) => {
        this.moviesList.set(res);
      },
    });
  }

  selectShowTime(time: string) {
    if (this.selectedShowtime() === time) {
      this.selectedShowtime.set(null)
      this.selectedSeats.set([]);
      return;
    }
    this.selectedShowtime.set(time);
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
  }

  toggleSeat(seatCode: string) {
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
    };

    console.log('Reservation:', payload);

    // TODO:
    // this.bookingService.create(payload).subscribe(...)

    alert(
      `Booking Success\nMovie: ${this.selectedMovie()?.name}\nSeats: ${this.selectedSeats().join(', ')}`
    );

    this.showConfirmModal.set(false);
    this.selectedSeats.set([]);
  }
}