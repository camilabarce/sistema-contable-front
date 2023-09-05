import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './modules/layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {path: '', redirectTo: 'cuentas', pathMatch: 'full'},
  {
    path: '',
    component: AdminLayoutComponent, 
    children: [
      {
        path: 'cuentas',
        loadChildren: () => 
        import('./modules/cuentas-administration/cuentas-administration.module').then(mod => mod.CuentasAdministrationModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }