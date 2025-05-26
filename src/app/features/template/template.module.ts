import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTemplateComponent } from './components/create-template/create-template.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';


@NgModule({
  declarations: [CreateTemplateComponent,TemplateComponent,TemplateListComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
