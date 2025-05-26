import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { CreateTemplateComponent } from './components/create-template/create-template.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: TemplateListComponent
      },
      {
        path: 'create',
        component: CreateTemplateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
