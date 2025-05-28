import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  standalone: false
})
export class CreateUserComponent {
  response!: any;
  errorResponse!: any;
  usernameTakenError: string | null = null;
  createUserForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, this.passwordStrengthValidator()]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  passwordStatus = {
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  };
  get name() {
    return this.createUserForm.get('name');
  }

  get username() {
    return this.createUserForm.get('username');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get confirmPassword() {
    return this.createUserForm.get('confirmPassword');
  }

  createSenderLoading = false;
  senderCreationFailed = false;
  loading = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Received data:', this.data);
  }

  ngOnInit(): void {
    this.createUserForm.setValidators(this.passwordMatchValidator);
    // Live password feedback
    this.password?.valueChanges.subscribe((value) => {
      const val = value ?? ''; // fallback to empty string if null
      this.passwordStatus = {
        length: val.length >= 12,
        upper: /[A-Z]/.test(val),
        lower: /[a-z]/.test(val),
        number: /\d/.test(val),
        special: /[\W_]/.test(val)
      };
    });
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const isValid = /[a-z]/.test(value) &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[\W_]/.test(value) &&
        value.length >= 12;
      return !isValid ? { weakPassword: true } : null;
    };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  // checkUsernameExists(): void {
  //   const username = this.username?.value as string;

  //   if (username) {
  //     this.http.get<boolean>(buildUrl(API_URL.userURLs.checkUsername, { username: username }))
  //       .pipe(
  //         catchError(err => {
  //           this.errorResponse = err?.message || 'Failed to create sender.';
  //           this.response = null;
  //           //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
  //           return err;
  //         })
  //       )
  //       .subscribe(exists => {
  //         if (exists) {
  //           this.username?.setErrors({ usernameTaken: true });
  //         } else {
  //           this.username?.setErrors({ usernameTaken: false });
  //         }
  //       });
  //   }
  // }

  checkUsernameExists(): void {
    const username = this.username?.value as string;

    if (username) {
      this.http.get<boolean>(buildUrl(API_URL.userURLs.checkUsername, { username: username }))
        .pipe(
          catchError(err => {
            //this.errorMessage = err?.message || 'Failed to create sender.';
            //this.successData = null;
            //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
            this.usernameTakenError = 'Failed to check username.Checking username api not working . Error is :' + err?.message;
            this.username?.setErrors({ usernameTaken: false });
            this.loading = false;
            return err;
          })
        )
        .subscribe(exists => {
          if (exists) {
            this.username?.setErrors({ usernameTaken: true });
            this.usernameTakenError = null; // Clear error if username is available
          }
        });
    }
  }

  createUser() {
    const createUserReq = { ...this.createUserForm.value };
    if (this.createUserForm?.valid) {
      delete createUserReq.confirmPassword;
      this.http.post<any>(API_URL.userURLs.createUser, createUserReq)
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
            this.response = null;
            return of(null);
          })
        )
        .subscribe((res) => {
          if (res) {
            this.response = res;
          }
          this.loading = false;
          this.errorResponse = null
        });
    }
  }

}
