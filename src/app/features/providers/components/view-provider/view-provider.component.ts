import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProviderResponse } from '../../models/provider.models';
import { catchError } from 'rxjs/internal/operators/catchError';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-view-provider',
  standalone: false,

  templateUrl: './view-provider.component.html',
  styleUrl: './view-provider.component.scss'
})
export class ViewProviderComponent {

  response!: IProviderResponse;
  rowData: any;
  errorResponse: any = null;
  loading = false;

  constructor(private http: HttpClient,
     public dialogRef: MatDialogRef<ViewProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.rowData = this.data;
    console.log('View Provider :', this.rowData);
  }

  
  ngOnInit(): void {
    this.http.get<IProviderResponse>(buildUrl(API_URL.providerURLs.getProvider, { providerId: this.rowData.id }))
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
    navigator.clipboard.writeText(this.response?.name || '').then(() => {
      console.log('provider copied!');
    });
  }
}