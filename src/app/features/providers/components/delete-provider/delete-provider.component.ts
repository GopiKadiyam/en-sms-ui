import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'
import { buildUrl } from 'src/app/shared/utilities/api.utilities';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
import { of } from 'rxjs/internal/observable/of';
import { pipe } from 'rxjs';
@Component({
  selector: 'app-delete-provider',
  standalone: false,

  templateUrl: './delete-provider.component.html',
  styleUrl: './delete-provider.component.scss'
})
export class DeleteProviderComponent {

  public rowData: any;
  public response: any;
  public errorResponse: any;
  public loading = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Delete Provider :', this.data);
    this.rowData = this.data;
  }

  deleteProvider(providerId: string) {
    this.http.delete<{ status: boolean } | null>(buildUrl(API_URL.providerURLs.deleteProvider, { providerId: providerId }))
      .pipe(
        catchError(err => {
          // Handle multiple error keys
          const errors = err?.error?.errors;
          if (errors && typeof errors === 'object') {
            // Store all error messages in an array
            this.errorResponse = Object.values(errors);
          } else {
            this.errorResponse = [err?.error?.message || err?.message || 'Failed to delete Provider.'];
          }
          this.loading = false;
          return of(null);
        }))

      .subscribe(res => {
        if (res?.status) {
          this.response = { name: this.rowData.name, id: this.rowData.id };
        }
        this.loading = false;
      })

  }

}