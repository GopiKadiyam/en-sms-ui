import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { API_URL } from 'src/app/app.constant';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { DeleteSenderComponent } from 'src/app/features/sender/delete-sender/delete-sender.component';

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
          return of(err);
        })
      )
      .subscribe(response => {
        this.message = "userId : " + userId + " deleted successfully";
      })

  }
}
