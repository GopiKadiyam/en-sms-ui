import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
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
  message: any;
  errorMessage: any;
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

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserApiKeyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received data:', this.data);
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
      this.http.post<any>(API_URL.userURLs.createApiKey.replace('{id}',userId), this.createUserApiKeyForm.value)
        .pipe(
          catchError(err => {
            this.errorMessage = err?.message || 'Failed to create API KEY.';
            // this.successData = null;
            //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
            return of(err);
          })
        )
        .subscribe((response) => {
          // this.successData = response;
          this.message = 'API KEY : ' + response?.apiKey + " created successfully for the User :"+response?.username;
        });
    }
  }
}
