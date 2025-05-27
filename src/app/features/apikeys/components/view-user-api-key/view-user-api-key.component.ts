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
  public rowData: any;
  public message: any;

  public userApiKeyRes!: IGetUserApiKeyRes;
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
          this.message = err?.message || 'Failed to get user api key.';
          return of(err);
        })
      )
      .subscribe(response => {
        this.userApiKeyRes = response;
      });
  }

  copyToClipboard(value: string): void {
    navigator.clipboard.writeText(value);
  }

  copyApiKey() {
    navigator.clipboard.writeText(this.userApiKeyRes?.apiKey || '').then(() => {
      console.log('API Key copied!');
    });
  }

}
