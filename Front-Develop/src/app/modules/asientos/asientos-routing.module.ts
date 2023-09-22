import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsientosListComponent } from './asientos-list/asientos-list/asientos-list.component';
import { AsientosDetailComponent } from './asientos-detail/asientos-detail/asientos-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AsientosListComponent},
  {path: 'detail', component: AsientosDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsientosRoutingModule { }
