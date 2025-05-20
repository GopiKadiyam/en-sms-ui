import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
  standalone: false
})
export class CreateUserComponent {
  successData: any;
  errorMessage!: string;
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

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

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

  checkUsernameExists(): void {
    const username = this.username?.value as string;

    if (username) {
      this.http.get<boolean>(API_URL.userURLs.checkUsername.replace('{username}', username))
        .pipe(
          catchError(err => {
            this.errorMessage = err?.message || 'Failed to create sender.';
            this.successData = null;
            //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
            return err;
          })
        )
        .subscribe(exists => {
          if (exists) {
            this.username?.setErrors({ usernameTaken: true });
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
            this.errorMessage = err?.message || 'Failed to create sender.';
            this.successData = null;
            //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
            return of(err);
          })
        )
        .subscribe((response) => {
          this.successData = response;
          this.errorMessage = '';
        });
    }
  }

}
