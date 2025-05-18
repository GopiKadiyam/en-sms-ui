import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';

@Component({
  selector: 'app-delete-sender',
  standalone: false,

  templateUrl: './delete-sender.component.html',
  styleUrl: './delete-sender.component.scss'
})
export class DeleteSenderComponent {

  public rowData: any;
  public message: any;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteSenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received data:', this.data);
    this.rowData = this.data;
    //this.createSenderForm.patchValue(this.data)
  }
  deleteSender(senderId: string) {
    this.http.delete<any>(API_URL.senderURLs.deleteSender.replace('{senderId}', senderId))
      .pipe(
        catchError(err => {
          this.message = err?.message || 'Failed to delete sender : ' + senderId;
          return err;
        })
      )
      .subscribe(response => {
        this.message = "senderId : " + senderId + " deleted successfully";
      })

  }
}
