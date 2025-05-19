import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { provideGlobalGridOptions } from 'ag-grid-community';

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

if ((window as any).ENABLE_PROD_MODE) {
    enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
