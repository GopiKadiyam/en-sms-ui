import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user.component';


import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { UserListComponent } from './components/user-list/user-list.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ActionRendererComponent } from './components/action-renderer/action-renderer.component';

ModuleRegistry.registerModules([AllCommunityModule]);
@NgModule({
  declarations: [UserComponent, UserListComponent, CreateUserComponent, ActionRendererComponent, DeleteUserComponent, EditUserComponent],
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
