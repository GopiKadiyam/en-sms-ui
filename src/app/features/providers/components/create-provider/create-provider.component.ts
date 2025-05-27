import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { IProviderResponse } from '../../models/provider.models';


@Component({
  selector: 'app-create-provider',
  standalone: false,

  templateUrl: './create-provider.component.html',
  styleUrl: './create-provider.component.scss'
})
export class CreateProviderComponent {
  response: IProviderResponse | null = null;
  errorResponse: any;
  providerForm = this.fb.group({
    name: ['', Validators.required]
  });
  get providerName() {
    return this.providerForm.get('name');
  }
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<CreateProviderComponent>
  ) { }

  createProvider() {
    if (this.providerForm.invalid) return;
    this.loading = true;
    this.http.post<IProviderResponse>(API_URL.providerURLs.createProvier, { name: this.providerForm.value.name })
      .pipe(
        catchError(err => {
          // Handle multiple error keys
          const errors = err?.error?.errors;
          if (errors && typeof errors === 'object') {
            // Store all error messages in an array
            this.errorResponse = Object.values(errors);
          } else {
            this.errorResponse = [err?.error?.message || err?.message || 'Failed to create Provider.'];
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

  close() {
    // this.dialogRef.close(this.providerId ? true : false);
  }
}