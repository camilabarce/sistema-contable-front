import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentasListComponent } from './cuentas-list/cuentas-list.component';
import { CuentasDetailComponent } from './cuentas-detail/cuentas-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: CuentasListComponent},
  {path: 'detail', component: CuentasDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasAdministrationRoutingModule { }
