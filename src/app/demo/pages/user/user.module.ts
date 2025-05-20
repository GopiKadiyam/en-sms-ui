import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ActionRendererComponent } from './action-renderer/action-renderer.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { UserApiKeyComponent } from './user-api-key/user-api-key.component';

ModuleRegistry.registerModules([AllCommunityModule]);
@NgModule({
  declarations: [UserComponent, UserListComponent, CreateUserComponent, ActionRendererComponent, DeleteUserComponent, EditUserComponent, UserApiKeyComponent],
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
