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
import { ActionRendererComponent } from './action-renderer/action-renderer.component';
import { EditSenderComponent } from './edit-sender/edit-sender.component';
import { DeleteSenderComponent } from './delete-sender/delete-sender.component';

ModuleRegistry.registerModules([AllCommunityModule]);
@NgModule({
  declarations: [CreateSenderComponent, SenderListComponent, SenderComponent,ActionRendererComponent, EditSenderComponent, DeleteSenderComponent],
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
