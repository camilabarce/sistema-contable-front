import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentasAdministrationRoutingModule } from './cuentas-administration-routing.module';
import { CuentasListComponent } from './cuentas-list/cuentas-list.component';
import { CuentasDetailComponent } from './cuentas-detail/cuentas-detail.component';
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
    CuentasListComponent,
    CuentasDetailComponent 
  ],
  imports: [
    CommonModule,
    CuentasAdministrationRoutingModule,
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
    CuentasListComponent
  ]
})
export class CuentasAdministrationModule { }
