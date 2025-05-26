import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserApiKeyComponent } from "../apikeys/user-api-key/user-api-key.component";
import { UserListComponent } from "./user-list/user-list.component";
import { CreateUserComponent } from "./create-user/create-user.component";

const routes: Routes = [
  {
    path:'',
    component: UserComponent,
    children:[
      {
        path:'',
        component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
