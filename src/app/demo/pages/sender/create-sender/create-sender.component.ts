import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/internal/operators/catchError';
import { API_URL } from 'src/app/app.constant';
import { COUNTRY } from 'src/app/demo/shared/sender.interface';

export interface ISenderResponse {
  id: number;
  senderId: string;
  description: string;
  country: string;
  serviceType: string;
  entityId: string;
  openFlag: string;
  statusFlag: boolean;
  user: any;
  createdOn: any;
  updatedOn: any;
}

export interface IServiceType {
  id: number,
  name: string
}

@Component({
  selector: 'app-create-sender',
  templateUrl: './create-sender.component.html',
  styleUrl: './create-sender.component.scss',
  standalone: false
})
export class CreateSenderComponent implements OnInit {
  successData: any;
  errorMessage!: string;
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
  public serviceTypes: IServiceType[] = [];
  public openFlags: string[] = ['yes', 'no'];
  createSenderLoading = false;
  senderCreationFailed = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<IServiceType[]>(API_URL.commonUrls.getServiceTypes)
      .subscribe(response => {
        this.serviceTypes = response;
      });
  }

  createSender() {
    console.log(this.createSenderForm?.value)
    if (this.createSenderForm?.valid) {
      this.http.post<ISenderResponse | null>(API_URL.senderURLs.createSender, this.createSenderForm.value, { headers: { "username": "gopi1782" } })
        .pipe(
          catchError(err => {
            this.errorMessage = err?.message || 'Failed to create sender.';
            this.successData = null;
            //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
            return err;
          })
        )
        .subscribe((response) => {
          this.successData = response;
          this.errorMessage = '';
        });
    }
  }

  // createSender() {
  //   console.log(this.createSenderForm.value)
  //   // if (this.createSenderForm?.valid) {
  //   //   this.createSenderLoading = true;
  //   //   console.log(this.createSenderForm.value);
  //   //   this.http.post<any>(API_URL.senderURLs.createSender, this.createSenderForm.value)
  //   //     .pipe(
  //   //       catchError(err => {
  //   //         this.createSenderLoading = false;
  //   //         this.senderCreationFailed = true;
  //   //         //this.toaster.showCustomToastAndIcon("danger", "Sender Creation Failed", err?.message, "")
  //   //         return err;
  //   //       })
  //   //     )
  //   //     .subscribe(res => {
  //   //       console.log(res);
  //   //       this.createSenderForm.reset();
  //   //       this.createSenderLoading = false;
  //   //       this.senderCreationFailed = false;
  //   //       //this.toaster.showCustomToastAndIcon("success", "SENDER ID : " + res?.senderId, "Sender Created successfully", "")
  //   //     });
  //   // }
  // }
}
