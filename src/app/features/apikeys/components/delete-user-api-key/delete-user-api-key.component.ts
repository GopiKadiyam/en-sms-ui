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
  public rowData: any;
  public message: any;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteUserApiKeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received data:', this.data);
    this.rowData = this.data;
  }
  
  deleteUser(userId: string) {
    this.http.delete<any>(buildUrl(API_URL.apiKeyURLs.deleteApiKey, { id: this.rowData.userId, keyId: this.rowData.id }))
      .pipe(
        catchError(err => {
          this.message = err?.message || 'Failed to delete api key : ' + userId;
          return of(err);
        })
      )
      .subscribe(response => {
        this.message = "API KEY Title : " + this.rowData.apiKeyTitle + " deleted successfully for username : "+this.rowData.username;
      })

  }
}
