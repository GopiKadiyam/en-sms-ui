import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenderRoutingModule } from './sender-routing.module';
import { CreateSenderComponent } from './create-sender/create-sender.component';
import { SenderListComponent } from './sender-list/sender-list.component';
import { SenderComponent } from './sender.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [CreateSenderComponent, SenderListComponent, SenderComponent],
  imports: [
    CommonModule,
    SenderRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SenderModule { }
