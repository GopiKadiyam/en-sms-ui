import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';

@Component({
  selector: 'app-delete-user-api-key',
  standalone: false,

  templateUrl: './delete-user-api-key.component.html',
  styleUrl: './delete-user-api-key.component.scss'
})
export class DeleteUserApiKeyComponent {
  rowData: any;
  response: any;
  errorResponse: any;
  loading = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteUserApiKeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Delete User API Key data:', this.data);
    this.rowData = this.data;
  }

  deleteUser(userId: string) {
    this.http.delete<any>(buildUrl(API_URL.apiKeyURLs.deleteApiKey, { id: this.rowData.userId, keyId: this.rowData.id }))
      .pipe(
        catchError(err => {
          // Handle multiple error keys
          const errors = err?.error?.errors;
          if (errors && typeof errors === 'object') {
            // Store all error messages in an array
            this.errorResponse = Object.values(errors);
          } else {
            this.errorResponse = [err?.error?.message || err?.message || 'Failed to delete api key.'];
          }
          this.loading = false;
          return of(null);
        }))

      .subscribe(res => {
        if (res?.status) {
          this.response = { apiKeyTitle: this.rowData.apiKeyTitle, username: this.rowData.username };
        }
        this.loading = false;
      })
  }
}
