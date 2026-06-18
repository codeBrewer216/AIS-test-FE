import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage';
import { Movie, MoviesService } from '../../services/movies';

export interface UploadResponse {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  isPublic: boolean;
  url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  private storageService = inject(StorageService);
  private moviesService = inject(MoviesService)
  showModal = signal(false);

  movie = {
    name: '',
    description: '',
    duration: 0,
    poster: '',
    startDate: new Date(),
    endDate: new Date(),
    type: ''
  };
  isImageLoading = false;

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.movie = {
      name: '',
      type: '',
      description: '',
      duration: 0,
      poster: '',
      startDate: new Date(),
      endDate: new Date()

    };
    this.showModal.set(false);
  }

  saveMovie() {
    this.create(this.movie)
    this.closeModal()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    this.isImageLoading = true;
    this.storageService.uploadImage(file).subscribe({
      next: (res) => {
        this.movie.poster = res.url;
      },
      error: (err) => {
        this.isImageLoading = false;
        console.error(err);
      },
    });
  }
  removePoster(fileInput: HTMLInputElement) {
    this.movie.poster = '';
    this.isImageLoading = false;
    fileInput.value = '';
  }

  onImageLoaded() {
    this.isImageLoading = false;
  }

  onImageError() {
    this.isImageLoading = false;
  }
  create(moive: Movie) {
    if (moive) {

      this.moviesService.create(moive).subscribe({
        next: (res) => {
          console.log(res)
        }
      })
    }
  }
}
