import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadosRoutingModule } from './estados-routing.module';
import { PatrimonialComponent } from './patrimonial/patrimonial.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    PatrimonialComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    EstadosRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTableModule
  ],
  exports: [
    PatrimonialComponent
  ]
})
export class EstadosModule { }
