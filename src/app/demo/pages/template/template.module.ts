import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { TemplateComponent } from './template.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateRoutingModule } from './template-routing.module';



@NgModule({
  declarations: [CreateTemplateComponent,TemplateComponent,TemplateListComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
