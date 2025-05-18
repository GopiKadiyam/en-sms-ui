import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenderRoutingModule } from './sender-routing.module';
import { CreateSenderComponent } from './create-sender/create-sender.component';
import { SenderListComponent } from './sender-list/sender-list.component';
import { SenderComponent } from './sender.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);
@NgModule({
  declarations: [CreateSenderComponent, SenderListComponent, SenderComponent],
  imports: [
    CommonModule,
    SenderRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AgGridModule,
    HttpClientModule
  ]
})
export class SenderModule { }
