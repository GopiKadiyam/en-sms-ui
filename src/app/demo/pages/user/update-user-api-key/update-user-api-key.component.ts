import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';

@Component({
  selector: 'app-update-user-api-key',
  standalone: false,

  templateUrl: './update-user-api-key.component.html',
  styleUrl: './update-user-api-key.component.scss'
})
export class UpdateUserApiKeyComponent {
  message: any;
  errorMessage: any;
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
    console.log('Received data:', this.data);
    this.updateUserApiKeyForm.patchValue(this.data)
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
    const urlWithId = API_URL.userURLs.updateApiKey.replace("{id}", formData.userId as string);
    const url = urlWithId.replace("{keyId}", formData.id as string);

    if (this.updateUserApiKeyForm?.valid) {
      this.http.put<any>(url, this.updateUserApiKeyForm.value)
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
          this.message = response?.apiKeyTitle + " API KEY updated successfully for the User :" + response?.username;
        });
    }
  }
}
