import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApikeysComponent } from './apikeys.component';
import { UserApiKeyComponent } from 'src/app/features/apikeys/user-api-key/user-api-key.component';

const routes: Routes = [ {
    path:'',
    component: ApikeysComponent,
    children:[
      {
        path:'',
        component: UserApiKeyComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApikeysRoutingModule { }
