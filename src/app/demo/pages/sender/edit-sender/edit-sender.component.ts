import { Component, Inject } from '@angular/core';
import { COUNTRY } from 'src/app/demo/shared/sender.interface';
import { IServiceType } from '../create-sender/create-sender.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-edit-sender',
  standalone: false,
  templateUrl: './edit-sender.component.html',
  styleUrl: './edit-sender.component.scss'
})
export class EditSenderComponent {

  message: any;
  errorMessage: any;
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
    console.log('Received data:', this.data);
    this.createSenderForm.patchValue(this.data)
  }

  ngOnInit(): void {
    this.http.get<IServiceType[]>(API_URL.commonUrls.getServiceTypes)
      .subscribe(response => {
        this.serviceTypes = response;
      });
  }

  createSender() {
    const senderId=this.createSenderForm?.value?.senderId;
    if (this.createSenderForm?.valid) {
      this.http.post<any>(API_URL.senderURLs.createSender, this.createSenderForm.value, { headers: { "username": "gopi1782" } })
        .pipe(
          catchError(err => {
            this.errorMessage = err?.message || 'Failed to create sender.';
            // this.successData = null;
            //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
            return err;
          })
        )
        .subscribe((response) => {
          // this.successData = response;
          this.message = 'senderId : '+senderId+" updated successfully";
        });
    }
  }
}
