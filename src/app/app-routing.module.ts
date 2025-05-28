import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
import { AdminComponent } from './layout/admin';
import { EmptyComponent } from './layout/empty';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/pages/dashboard/dashboard.component')
      },
      {
        path: 'sender',
        loadChildren: () => import('./features/sender/sender.module')
          .then(m => m.SenderModule)
      },
      {
        path: 'template',
        loadChildren: () => import('./features/template/template.module')
          .then(m => m.TemplateModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./features/user/user.module')
          .then(m => m.UserModule)
      },
      {
        path: 'user/api-key',
        loadChildren: () => import('./features/apikeys/apikeys.module')
          .then(m => m.ApikeysModule)
      },
      {
        path: 'providers',
        loadChildren: () => import('./features/providers/providers.module')
          .then(m => m.ProvidersModule)
      },
      {
        path: 'smsc',
        loadChildren: () => import('./features/smsc/smsc.module')
          .then(m => m.SmscModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/pages/components/component.module').then((m) => m.ComponentModule)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/pages/other/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: EmptyComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
