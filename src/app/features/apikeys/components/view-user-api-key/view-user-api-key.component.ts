import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';

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
    const urlWithId = API_URL.apiKeyURLs.updateApiKey.replace("{id}", this.rowData.userId as string);
    const url = urlWithId.replace("{keyId}", this.rowData.id as string);
    this.http.get<IGetUserApiKeyRes>(url)
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
