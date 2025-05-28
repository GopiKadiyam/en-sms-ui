import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmscComponent } from './smsc.component';
import { SmscListComponent } from './components/smsc-list/smsc-list.component';

const routes: Routes = [ {
    path:'',
    component: SmscComponent,
    children:[
      {
        path:'',
        component: SmscListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmscRoutingModule { }
