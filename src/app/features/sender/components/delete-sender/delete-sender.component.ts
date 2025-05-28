import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';

@Component({
  selector: 'app-delete-sender',
  standalone: false,

  templateUrl: './delete-sender.component.html',
  styleUrl: './delete-sender.component.scss'
})
export class DeleteSenderComponent {

  public rowData: any;
  public response: any;
  public errorResponse: any;
  public loading = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteSenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Delete Sender data:', this.data);
    this.rowData = this.data;
    //this.createSenderForm.patchValue(this.data)
  }
  deleteSender(senderId: string) {
    this.http.delete<any>(buildUrl(API_URL.senderURLs.deleteSender, { senderId: senderId }))
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
          this.response = { senderId: this.rowData.senderId };
        }
        this.loading = false;
      })
  }
}
