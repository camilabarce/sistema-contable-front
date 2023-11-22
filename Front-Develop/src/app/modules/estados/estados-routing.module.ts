import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatrimonialComponent } from './patrimonial/patrimonial.component';
import { ResultadosComponent } from './resultados/resultados.component';

const routes: Routes = [
  {path: '', redirectTo: 'estados', pathMatch: 'full'},
  {path: 'resultados', component: ResultadosComponent},
  {path: 'patrimonial', component: PatrimonialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadosRoutingModule { }
