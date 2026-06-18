import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UploadResponse } from '../pages/admin-dashboard/admin-dashboard';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private http = inject(HttpClient);
  private authService = inject(AuthService)
  private apiUrl = `${environment.apiUrl}/storage`;

  uploadImage(file: File) {
    const formData = new FormData();
    const accessToken = this.authService.getToken()
    formData.append('file', file);
    return this.http.post<UploadResponse>(
      `${this.apiUrl}/upload`,
      formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
      }),
    }
    );
  }
}