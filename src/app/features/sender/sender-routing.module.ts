import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SenderComponent } from "./sender.component";
import { SenderListComponent } from "./sender-list/sender-list.component";
import { CreateSenderComponent } from "./create-sender/create-sender.component";

const routes: Routes = [
  {
    path:'',
    component: SenderComponent,
    children:[
      {
        path:'',
        component: SenderListComponent
      },
      {
        path:'create',
        component: CreateSenderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SenderRoutingModule { }
