import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsientosRoutingModule } from './asientos-routing.module';
import { AsientosListComponent } from './asientos-list/asientos-list/asientos-list.component';
import { AsientosDetailComponent } from './asientos-detail/asientos-detail/asientos-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AsientosListComponent,
    AsientosDetailComponent
  ],
  imports: [
    CommonModule,
    AsientosRoutingModule,
    MatCardModule,
    MatTableModule
  ]
})
export class AsientosModule { }
