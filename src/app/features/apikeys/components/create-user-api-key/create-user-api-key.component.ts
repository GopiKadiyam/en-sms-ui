import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';
export interface IUserInfo {
  id: string;
  name: string;
  username: string;
  password: string;
  activeFlag: boolean;
}

@Component({
  selector: 'app-create-user-api-key',
  standalone: false,
  templateUrl: './create-user-api-key.component.html',
  styleUrl: './create-user-api-key.component.scss'
})
export class CreateUserApiKeyComponent {
  response: any = null;
  errorResponse: any;
  createUserApiKeyForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    apiKeyTitle: new FormControl('', [Validators.required]),
    validity: new FormControl('', [Validators.required]),
  });

  get username() {
    return this.createUserApiKeyForm.get('username');
  }

  get apiKeyTitle() {
    return this.createUserApiKeyForm.get('apiKeyTitle');
  }

  get validity() {
    return this.createUserApiKeyForm.get('validity');
  }

  public users: IUserInfo[] = [];
  public validities: String[] = ['QUARTERLY', 'HALF_YEAR', 'YEAR', 'INFINITY'];
  loading = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserApiKeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Create User API KEY data:', this.data);
    //this.createSenderForm.patchValue(this.data)
  }

  ngOnInit(): void {
    this.http.get<IUserInfo[]>(API_URL.userURLs.getUserList)
      .subscribe((response) => {
        this.users = response;
      });
  }

  createUserApiKey() {
    const userId: string = this.createUserApiKeyForm.value.username as string;

    if (this.createUserApiKeyForm?.valid) {
      this.http.post<any>(buildUrl(API_URL.apiKeyURLs.createApiKey,{id:userId}) , this.createUserApiKeyForm.value)
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
