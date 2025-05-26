import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user.component';
import { ActionRendererComponent } from './user-crud/action-renderer/action-renderer.component';
import { EditUserComponent } from './user-crud/edit-user/edit-user.component';


import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { CreateUserApiKeyComponent } from './api-key-crud/create-user-api-key/create-user-api-key.component';
import { UpdateUserApiKeyComponent } from './api-key-crud/update-user-api-key/update-user-api-key.component';
import { ViewUserApiKeyComponent } from './api-key-crud/view-user-api-key/view-user-api-key.component';
import { DeleteUserApiKeyComponent } from './api-key-crud/delete-user-api-key/delete-user-api-key.component';
import { UserApiKeyActionRendererComponent } from './api-key-crud/user-api-key-action-renderer/user-api-key-action-renderer.component';
import { UserListComponent } from './user-crud/user-list/user-list.component';
import { CreateUserComponent } from './user-crud/create-user/create-user.component';
import { DeleteUserComponent } from './user-crud/delete-user/delete-user.component';
import { UserApiKeyComponent } from './api-key-crud/user-api-key/user-api-key.component';

ModuleRegistry.registerModules([AllCommunityModule]);
@NgModule({
  declarations: [UserComponent, UserListComponent, CreateUserComponent, ActionRendererComponent, DeleteUserComponent, EditUserComponent, UserApiKeyComponent, CreateUserApiKeyComponent, UpdateUserApiKeyComponent, ViewUserApiKeyComponent, DeleteUserApiKeyComponent, UserApiKeyActionRendererComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AgGridModule,
    HttpClientModule
  ]
})
export class UserModule { }
