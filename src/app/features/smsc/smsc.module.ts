import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmscRoutingModule } from './smsc-routing.module';
import { SmscComponent } from './smsc.component';
import { SmscListComponent } from './components/smsc-list/smsc-list.component';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { CreateSmscComponent } from './components/create-smsc/create-smsc.component';
import { UpdateSmscComponent } from './components/update-smsc/update-smsc.component';
import { DeleteSmscComponent } from './components/delete-smsc/delete-smsc.component';
import { SmscActionRendererComponent } from './components/smsc-action-renderer/smsc-action-renderer.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@NgModule({
  declarations: [
    SmscComponent,
    SmscListComponent,
    CreateSmscComponent,
    UpdateSmscComponent,
    DeleteSmscComponent,
    SmscActionRendererComponent
  ],
  imports: [
    CommonModule,
    SmscRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AgGridModule,
    HttpClientModule
  ]
})
export class SmscModule { }
