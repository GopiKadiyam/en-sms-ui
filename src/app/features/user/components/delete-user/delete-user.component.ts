import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { API_URL } from 'src/app/app.constant';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { DeleteSenderComponent } from 'src/app/features/sender/components/delete-sender/delete-sender.component';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';

@Component({
  selector: 'app-delete-user',
  standalone: false,

  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  public rowData: any;
  public response: any;
  public errorResponse: any;
  public loading = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteSenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received data:', this.data);
    this.rowData = this.data;
  }
  deleteUser(userId: string) {
    this.http.delete<any>(buildUrl(API_URL.userURLs.deleteUser, { id: userId }))
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
          this.response = { userId: this.rowData.id };
        }
        this.loading = false;
      })

  }
}
