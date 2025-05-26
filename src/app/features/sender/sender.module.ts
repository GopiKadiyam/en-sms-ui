import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenderRoutingModule } from './sender-routing.module';
import { CreateSenderComponent } from './components/create-sender/create-sender.component';
import { SenderListComponent } from './components/sender-list/sender-list.component';
import { SenderComponent } from './sender.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { EditSenderComponent } from './components/edit-sender/edit-sender.component';
import { DeleteSenderComponent } from './components/delete-sender/delete-sender.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionRendererComponent } from './components/action-renderer/action-renderer.component';

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
