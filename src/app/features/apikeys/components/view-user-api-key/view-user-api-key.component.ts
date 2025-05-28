import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';

export interface IGetUserApiKeyRes {
  id: number;
  userId: string;
  name: string;
  username: string;
  apiKeyTitle: string;
  apiKey: string;
  validity: string;
  expiresOn: string;
  activeFlag: boolean
}

@Component({
  selector: 'app-view-user-api-key',
  standalone: false,

  templateUrl: './view-user-api-key.component.html',
  styleUrl: './view-user-api-key.component.scss'
})
export class ViewUserApiKeyComponent implements OnInit {
  rowData: any;
  message: any;
  errorResponse: any = null;
  response!: IGetUserApiKeyRes;
  loading = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ViewUserApiKeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received data for ViewUserApiKeyComponent :', this.data);
    this.rowData = this.data;
  }
  ngOnInit(): void {
    this.http.get<IGetUserApiKeyRes>(buildUrl(API_URL.apiKeyURLs.getApiKey, { id: this.rowData.userId, keyId: this.rowData.id }))
      .pipe(
        catchError(err => {
          // Handle multiple error keys
          const errors = err?.error?.errors;
          if (errors && typeof errors === 'object') {
            // Store all error messages in an array
            this.errorResponse = Object.values(errors);
          } else {
            this.errorResponse = [err?.error?.message || err?.message || 'Failed to get Provider details '];
          }
          this.loading = false;
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.response = res;
        }
        this.loading = false;
      });

  }

  copyToClipboard(value: string): void {
    navigator.clipboard.writeText(value);
  }

  copyApiKey() {
    navigator.clipboard.writeText(this.response?.apiKey || '').then(() => {
      console.log('API Key copied!');
    });
  }

}
