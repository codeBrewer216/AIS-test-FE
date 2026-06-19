import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage';
import { Movie, MoviesService } from '../../services/movies';

export interface UploadResponse {
  _id?: string;
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
  modalMode = signal<'create' | 'edit' | ''>('')
  showModal = signal(false);
  showDeleteModal = signal(false)
  selectMovieID = ''
  moviesList = signal<Movie[]>([]);
  movie = {
    name: '',
    description: '',
    length: 0,
    poster: '',
    startDate: new Date(),
    endDate: new Date(),
    type: ''
  };
  isImageLoading = false;

  ngOnInit() {
    this.moviesService.getList().subscribe({
      next: (res: Movie[]) => {
        this.moviesList.set(res)
      }
    })
  }

  openDeleteModal(id: string) {
    this.selectMovieID = id
    this.showDeleteModal.set(true)
  }

  closeDeleteModal() {
    this.selectMovieID = ''
    this.showDeleteModal.set(false)
  }

  submitDelete() {
    this.delete(this.selectMovieID)
    this.selectMovieID = ''
    this.showDeleteModal.set(false)
    this.ngOnInit()
  }

  openModal() {
    this.modalMode.update(_v => 'create')
    this.showModal.set(true);
  }

  openEditMoDal(selected?: Movie) {
    if (selected) {
      this.selectMovieID = selected._id ?? ''
      this.movie = {
        name: selected.name ?? '',
        description: selected.description ?? '',
        length: selected.length ?? 0,
        poster: selected.poster ?? '',
        startDate: selected.startDate ? new Date(selected.startDate as any) : new Date(),
        endDate: selected.endDate ? new Date(selected.endDate as any) : new Date(),
        type: selected.type ?? ''
      };
    }
    this.openModal();
    this.modalMode.update(_v => 'edit')
  }

  closeModal() {
    this.movie = {
      name: '',
      type: '',
      description: '',
      length: 0,
      poster: '',
      startDate: new Date(),
      endDate: new Date()

    };
    this.showModal.set(false);
  }

  saveMovie() {
    if (this.modalMode() === 'create') {

      this.create(this.movie)
    } else {
      this.edit(this.selectMovieID)
    }
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

  // Helpers to bind Date objects to <input type="datetime-local"> which
  // expects a string like "YYYY-MM-DDTHH:MM" in local time.
  private toInputString(d: Date): string {
    if (!d) return '';
    const tzOffset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - tzOffset * 60000);
    return local.toISOString().slice(0, 16);
  }

  get startDateString(): string {
    return this.toInputString(this.movie.startDate ?? new Date());
  }

  set startDateString(v: string) {
    this.movie.startDate = v ? new Date(v) : new Date();
  }

  get endDateString(): string {
    return this.toInputString(this.movie.endDate ?? new Date());
  }

  set endDateString(v: string) {
    this.movie.endDate = v ? new Date(v) : new Date();
  }
  create(moive: Movie) {
    if (moive) {

      this.moviesService.create(moive).subscribe({
        next: (res) => {
          this.ngOnInit()
        }
      })
    }
  }

  delete(id: string) {
    this.moviesService.delete(id).subscribe({
      next: (res) => {
        console.log(res)
        this.ngOnInit()
      }
    })
  }

  edit(id: string) {
    this.moviesService.put(id, this.movie).subscribe({
      next: (res) => {
        console.log(res)
        this.ngOnInit()
      }
    })
  }
}
