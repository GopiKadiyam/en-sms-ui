import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApikeysRoutingModule } from './apikeys-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ApikeysComponent } from './apikeys.component';
import { UserApiKeyListComponent } from './components/user-api-key-list/user-api-key.component';
import { UpdateUserApiKeyComponent } from './components/update-user-api-key/update-user-api-key.component';
import { ViewUserApiKeyComponent } from './components/view-user-api-key/view-user-api-key.component';
import { UserApiKeyActionRendererComponent } from './components/user-api-key-action-renderer/user-api-key-action-renderer.component';
import { CreateUserApiKeyComponent } from './components/create-user-api-key/create-user-api-key.component';
import { DeleteUserApiKeyComponent } from './components/delete-user-api-key/delete-user-api-key.component';


@NgModule({
  declarations: [
    ApikeysComponent,UserApiKeyListComponent, CreateUserApiKeyComponent, UpdateUserApiKeyComponent, ViewUserApiKeyComponent, DeleteUserApiKeyComponent, UserApiKeyActionRendererComponent
  ],
  imports: [
    CommonModule,
    ApikeysRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AgGridModule,
    HttpClientModule
  ]
})
export class ApikeysModule { }
