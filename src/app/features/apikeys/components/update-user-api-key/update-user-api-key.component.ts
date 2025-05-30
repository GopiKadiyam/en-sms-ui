import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';

@Component({
  selector: 'app-update-user-api-key',
  standalone: false,

  templateUrl: './update-user-api-key.component.html',
  styleUrl: './update-user-api-key.component.scss'
})
export class UpdateUserApiKeyComponent {
  response: any;
  errorResponse: any;
  rowData: any;
  loading: boolean = false;

  updateUserApiKeyForm = this.fb.group({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    userId: new FormControl({ value: '', disabled: true }, [Validators.required]),
    username: new FormControl({ value: '', disabled: true }, [Validators.required]),
    apiKeyTitle: new FormControl({ value: '', disabled: true }, [Validators.required]),
    validity: new FormControl('', [Validators.required]),
    expiresOn: new FormControl({ value: '', disabled: true }, [Validators.required]),
    activeFlag: new FormControl('', [Validators.required]),
  });

  get username() {
    return this.updateUserApiKeyForm.get('username');
  }

  get apiKeyTitle() {
    return this.updateUserApiKeyForm.get('apiKeyTitle');
  }

  get validity() {
    return this.updateUserApiKeyForm.get('validity');
  }
  get activeFlag() {
    return this.updateUserApiKeyForm.get('activeFlag');
  }
  get expiresOn() {
    return this.updateUserApiKeyForm.get('expiresOn');
  }

  public validities: String[] = ['QUARTERLY', 'HALF_YEAR', 'YEAR', 'INFINITY'];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateUserApiKeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rowData = this.data;
    console.log('Update user api key data:', this.rowData);
    this.updateUserApiKeyForm.patchValue(this.rowData)
  }

  ngOnInit(): void {
    // this.http.get<IUserInfo[]>(API_URL.userURLs.getUserList)
    //   .subscribe((response) => {
    //     this.users = response;
    //   });
  }

  updateUserApiKey() {
    const userId: string = this.updateUserApiKeyForm.value.username as string;
    const formData = this.updateUserApiKeyForm.getRawValue();

    if (this.updateUserApiKeyForm?.valid) {
      this.http.put<any>(buildUrl(API_URL.apiKeyURLs.updateApiKey,{ id: formData.userId as string, keyId: formData.id as string }), this.updateUserApiKeyForm.value)
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
  }
}
