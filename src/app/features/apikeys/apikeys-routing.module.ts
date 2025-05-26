import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApikeysComponent } from './apikeys.component';
import { UserApiKeyListComponent } from 'src/app/features/apikeys/components/user-api-key-list/user-api-key.component';

const routes: Routes = [ {
    path:'',
    component: ApikeysComponent,
    children:[
      {
        path:'',
        component: UserApiKeyListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApikeysRoutingModule { }
