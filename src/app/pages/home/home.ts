import { Component, inject, signal, } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Movie, MoviesService } from '../../services/movies';
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [FormsModule, RouterLink,],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  private moviesService = inject(MoviesService);
  private authService = inject(AuthService);


  moviesList = signal<Movie[]>([]);
  isLogined = this.authService.isLoggedIn()

  ngOnInit() {
    this.moviesService.getList().subscribe({
      next: (res: Movie[]) => {
        this.moviesList.set(res)
      }
    })
  }
}
