import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { DeleteSenderComponent } from '../../sender/delete-sender/delete-sender.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { API_URL } from 'src/app/app.constant';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-delete-user',
  standalone: false,

  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  public rowData: any;
  public message: any;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteSenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received data:', this.data);
    this.rowData = this.data;
  }
  deleteUser(userId: string) {
    this.http.delete<any>(API_URL.userURLs.deleteUser.replace('{id}', userId))
      .pipe(
        catchError(err => {
          this.message = err?.message || 'Failed to delete user : ' + userId;
          return err;
        })
      )
      .subscribe(response => {
        this.message = "userId : " + userId + " deleted successfully";
      })

  }
}
