import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsientosRoutingModule } from './asientos-routing.module';
import { AsientosListComponent } from './asientos-list/asientos-list/asientos-list.component';
import { AsientosDetailComponent } from './asientos-detail/asientos-detail/asientos-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AsientosListComponent,
    AsientosDetailComponent
  ],
  imports: [
    CommonModule,
    AsientosRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AsientosModule { }
