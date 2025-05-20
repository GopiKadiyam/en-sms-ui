import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EditSenderComponent } from '../../sender/edit-sender/edit-sender.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { API_URL } from 'src/app/app.constant';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  message: any;
  errorMessage: any;
  allowNewPassword = false;
  currentPasswordError = '';
  passwordStatus = {
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  };

  updateUserForm = this.fb.group({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    username: new FormControl({ value: '', disabled: true }, [Validators.required]),
    activeFlag: new FormControl(false, [Validators.required]),
    changePassword: new FormControl(false),
    currentPassword: new FormControl(''),
    newPassword: new FormControl('', [Validators.required, this.passwordStrengthValidator()]),
    confirmPassword: new FormControl(''),
  });

  get id() {
    return this.updateUserForm.get('id');
  }
  get name() {
    return this.updateUserForm.get('name');
  }

  get username() {
    return this.updateUserForm.get('username');
  }

  get currentPassword() {
    return this.updateUserForm.get('currentPassword');
  }

  get newPassword() {
    return this.updateUserForm.get('newPassword');
  }

  get confirmPassword() {
    return this.updateUserForm.get('confirmPassword');
  }

  get changePassword() {
    return this.updateUserForm.get('changePassword');
  }

  get activeFlag() {
    return this.updateUserForm.get('activeFlag');
  }


  public openFlags: string[] = ['yes', 'no'];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditSenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received data:', this.data);
    this.updateUserForm.patchValue(this.data)
  }

  ngOnInit(): void {
    this.updateUserForm.setValidators(this.passwordMatchValidator);
    // Live password feedback
    this.newPassword?.valueChanges.subscribe((value) => {
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

  onToggleChangePassword(): void {
    this.allowNewPassword = false;
    this.currentPassword?.setValue('');
    this.currentPasswordError = '';
    this.updateUserForm.get('newPassword')?.reset();
    this.updateUserForm.get('confirmPassword')?.reset();
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
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  verifyCurrentPassword(): void {
    const formValue = this.updateUserForm.getRawValue();
    if (!!formValue.currentPassword) {
      this.http.post<boolean>(API_URL.userURLs.verifyPassword, {
        id: formValue.id,
        password: this.currentPassword?.value
      }).pipe(
        catchError(err => {
          this.currentPasswordError = 'Failed to validate current password.';
          this.allowNewPassword = false;
          //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
          return err;
        })
      ).subscribe(valid => {
        if (valid) {
          this.currentPasswordError = '';
          this.allowNewPassword = true;
        } else {
          this.currentPasswordError = 'Incorrect current password.';
          this.allowNewPassword = false;
        }
      });
    } else {
      this.currentPasswordError = ''
    }

  }

  checkUsernameExists(): void {
    const username = this.username?.value as string;

    if (username) {
      this.http.get<boolean>(API_URL.userURLs.checkUsername.replace('{username}', username))
        .pipe(
          catchError(err => {
            this.errorMessage = err?.message || 'Failed to create sender.';
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

  validForm(): boolean {
    const v = this.updateUserForm.getRawValue();
    if (!v.name || v.activeFlag === null) return false;
    if (v.changePassword) {
      const newPasswordControl = this.updateUserForm.get('newPassword');
      const confirmPasswordControl = this.updateUserForm.get('confirmPassword');
      if (!newPasswordControl || !newPasswordControl.valid) return false;
      if (newPasswordControl.value !== confirmPasswordControl?.value) return false;
    }
    return true;
  }




  updateUser() {
    const formValue = this.updateUserForm.getRawValue();
    const { currentPassword, confirmPassword, newPassword, ...basePayload } = formValue;
    const payload = formValue.changePassword ? { ...basePayload, newPassword } : { ...basePayload };

    if (!this.validForm()) {
      return;
    }

    console.log(payload)
    this.http.put<any>(
      API_URL.userURLs.updateUser.replace('{id}', payload.id as string),
      payload
    ).pipe(
      catchError(err => {
        this.errorMessage = err?.message || 'Failed to update user.';
        return err;
      })
    ).subscribe(response => {
      this.message = `User ${response.username} updated successfully`;
    });
  }



}
