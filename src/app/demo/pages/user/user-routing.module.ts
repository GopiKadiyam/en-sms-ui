import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserApiKeyComponent } from "./api-key-crud/user-api-key/user-api-key.component";
import { UserListComponent } from "./user-crud/user-list/user-list.component";
import { CreateUserComponent } from "./user-crud/create-user/create-user.component";

const routes: Routes = [
  {
    path:'',
    component: UserComponent,
    children:[
      {
        path:'',
        component: UserListComponent
      },
      {
        path:'create',
        component: CreateUserComponent
      },
      {
        path:'api-key',
        component: UserApiKeyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
