import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { IProviderResponse } from '../../models/provider.models';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';
import { API_URL } from 'src/app/app.constant';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-update-provider',
  standalone: false,
  templateUrl: './update-provider.component.html',
  styleUrl: './update-provider.component.scss'
})
export class UpdateProviderComponent {
  response: IProviderResponse | null = null;
  errorResponse: any;

  updatepPoviderForm = this.fb.group({
    id: [{ value: '', disabled: true }],
    name: ['', Validators.required],
    createdOn: [{ value: '', disabled: true }],
    updatedOn: [{ value: '', disabled: true }]
  });
  get providerName() {
    return this.updatepPoviderForm.get('name');
  }
  get providerId() {
    return this.updatepPoviderForm.get('id');
  }
  get createdOn() {
    return this.updatepPoviderForm.get('createdOn');
  }
  get updatedOn() {
    return this.updatepPoviderForm.get('updatedOn');
  }

  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<UpdateProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log('Update Provider :', this.data);
    this.updatepPoviderForm.patchValue(this.data)
  }

  updateProvider() {
    if (this.updatepPoviderForm.invalid) return;
    const updateProviderPayload = this.updatepPoviderForm.getRawValue();
    this.loading = true;
    this.http.put<IProviderResponse>(buildUrl(API_URL.providerURLs.updateProvider, { providerId: updateProviderPayload.id as string }), { name: updateProviderPayload.name })
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

    // .subscribe({
    //   next: () => {
    //     this.loading = false;
    //     this.dialogRef.close(true);
    //   },
    //   error: () => {
    //     this.error = 'Failed to update provider';
    //     this.loading = false;
    //   }
    // });
  }

  close() {
    this.dialogRef.close(false);
  }
}