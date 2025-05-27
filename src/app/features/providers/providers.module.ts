import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { CreateProviderComponent } from './components/create-provider/create-provider.component';
import { UpdateProviderComponent } from './components/update-provider/update-provider.component';
import { DeleteProviderComponent } from './components/delete-provider/delete-provider.component';
import { ProviderActionRendererComponent } from './components/provider-action-renderer/provider-action-renderer.component';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ViewProviderComponent } from './components/view-provider/view-provider.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@NgModule({
  declarations: [
    ProvidersComponent,
    ProviderListComponent,
    CreateProviderComponent,
    ViewProviderComponent,
    UpdateProviderComponent,
    DeleteProviderComponent,
    ProviderActionRendererComponent
  ],
  imports: [
     CommonModule,
    ProvidersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AgGridModule,
    HttpClientModule
  ]
})
export class ProvidersModule { }
