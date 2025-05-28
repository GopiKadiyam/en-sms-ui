import { Component, Inject } from '@angular/core';
import { COUNTRY } from 'src/app/shared/models/sender.interface';
import { IServiceType } from '../create-sender/create-sender.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { buildUrl } from 'src/app/shared/utilities/api.utilities';

@Component({
  selector: 'app-edit-sender',
  standalone: false,
  templateUrl: './edit-sender.component.html',
  styleUrl: './edit-sender.component.scss'
})
export class EditSenderComponent {

  response: any;
  errorResponse: any;
  rowData: any;
  loading: boolean = false;

  createSenderForm = this.fb.group({
    id: new FormControl('', [Validators.required]),
    senderId: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    serviceType: new FormControl('', [Validators.required]),
    entityId: new FormControl('', [Validators.required]),
    openFlag: new FormControl('', [Validators.required]),
    statusFlag: new FormControl(false, [Validators.required]),
  });

  get senderId() {
    return this.createSenderForm.get('senderId');
  }

  get description() {
    return this.createSenderForm.get('description');
  }

  get country() {
    return this.createSenderForm.get('country');
  }

  get serviceType() {
    return this.createSenderForm.get('serviceType');
  }

  get entityId() {
    return this.createSenderForm.get('entityId');
  }

  get openFlag() {
    return this.createSenderForm.get('openFlag');
  }

  get statusFlag() {
    return this.createSenderForm.get('statusFlag');
  }


  // public serviceTypes: SERVICE_TYPE[] = Object.values(SERVICE_TYPE);
  public countries: COUNTRY[] = Object.values(COUNTRY);
  public serviceTypes: IServiceType[] = [];
  public openFlags: string[] = ['yes', 'no'];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditSenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rowData = this.data;
    console.log('Edit Sender data:', this.rowData);
    this.createSenderForm.patchValue(this.rowData)
  }

  ngOnInit(): void {
    this.http.get<IServiceType[]>(API_URL.commonUrls.getServiceTypes)
      .subscribe(response => {
        this.serviceTypes = response;
      });
  }

  updateSender() {
    const senderId: string = this.createSenderForm.value.senderId as string;
    if (this.createSenderForm?.valid) {
      this.http.put<any>(buildUrl(API_URL.senderURLs.updateSender, { senderId: senderId }), this.createSenderForm.value, { headers: { "username": "gopi1782" } })
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
