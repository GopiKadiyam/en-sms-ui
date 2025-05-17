import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
import { COUNTRY } from 'src/app/demo/shared/sender.interface';

@Component({
  selector: 'app-create-sender',
  templateUrl: './create-sender.component.html',
  styleUrl: './create-sender.component.scss',
  standalone: false
})
export class CreateSenderComponent {
 createSenderForm = new FormGroup({
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
  public serviceTypes: string[]=[];
  createSenderLoading = false;
  senderCreationFailed = false;

  constructor(private http: HttpClient) { }

  createSender() {
    if (this.createSenderForm?.valid) {
      this.createSenderLoading = true;
      console.log(this.createSenderForm.value);
      this.http.post<any>(API_URL.senderURLs.createSender, this.createSenderForm.value)
        .pipe(
          catchError(err => {
            this.createSenderLoading = false;
            this.senderCreationFailed = true;
            //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
            return err;
          })
        )
        .subscribe(res => {
          console.log(res);
          this.createSenderForm.reset();
          this.createSenderLoading = false;
          this.senderCreationFailed = false;
          //this.toaster.showCustomToastAndIcon("success", "SENDER ID : " + res?.senderId, "Sender Created successfully", "")
        });
    }
  }
}
