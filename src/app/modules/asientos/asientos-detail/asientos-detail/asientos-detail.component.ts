import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api-service.service';  
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-asientos-detail',
  templateUrl: './asientos-detail.component.html',
  styleUrls: ['./asientos-detail.component.css']
})
export class AsientosDetailComponent implements OnInit {
  asientosForm: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private router: Router
    ) {
      this.asientosForm = this.fb.group({
        cuentas: [0, Validators.required],
        importe: [0, Validators.required]
      });
    }
    
  cuentasApi: any[] = [];
    
  ngOnInit() {
    this.apiService.seleccionarCuentasAsientos().subscribe((data: any) => {
      this.cuentasApi = data;
      console.log("Select Asientos: ", this.cuentasApi);
    });
  }
  
  mostrarTabla: boolean = false;
  mostrarBtnGuardar: boolean = false;
  cuentaSeleccionada: number | null = null;
  cuentasDeshabilitadas: number[] = [];
  debe: number | null = null;
  haber: number | null = null;  
  cuentasSeleccionadas: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.cuentasSeleccionadas);
  totalDebe: number = 0;
  totalHaber: number = 0;

  agregarCuenta() {
    if (this.cuentaSeleccionada !== null) {
      const cuenta = this.cuentasApi.find((cuenta) => cuenta.id_cuenta === this.cuentaSeleccionada);
      if (cuenta) {
        this.mostrarTabla = true;
        this.mostrarBtnGuardar = true;
        // Dependiendo de si el valor se ingresó en Debe o Haber, se asigna el importe correspondiente
        const importe = (this.debe !== null) ? this.debe : ((this.haber !== null) ? -this.haber : 0);
        this.cuentasSeleccionadas.push({ id_cuenta: cuenta.id_cuenta, importe });
        this.cuentasDeshabilitadas.push(cuenta.id_cuenta);// Esto es para anular la cuenta elegida del mat-option

        // Actualiza el total del debe o del haber según corresponda
        if (this.debe !== null) {
          this.totalDebe += importe;
        } else if (this.haber !== null) {
          this.totalHaber += Math.abs(importe);
        }

        this.cuentaSeleccionada = null;
        this.debe = null;
        this.haber = null;
        this.dataSource.data = this.cuentasSeleccionadas;// Actualiza el dataSource con las cuentas seleccionadas
      }
    }
    console.log("Preseleccion:" , this.cuentasSeleccionadas);
  }

  eliminarCuentaDelAsiento(idCuenta: number) {
    const indiceCuenta = this.cuentasSeleccionadas.findIndex(cuenta => cuenta.id_cuenta === idCuenta);
    if (indiceCuenta !== -1) { //Es (-1) cuando no se encuentra el índice
      const importeEliminado = this.cuentasSeleccionadas[indiceCuenta].importe;
      this.cuentasSeleccionadas.splice(indiceCuenta, 1); //Eliminamos la cuenta de la tabla
      this.dataSource.data = this.cuentasSeleccionadas; // Actualizamos las cuentas
      
      // Resta el importe eliminado del total del debe o del haber según corresponda
      if (importeEliminado > 0) {
        this.totalDebe -= importeEliminado;
      } else {
        this.totalHaber -= Math.abs(importeEliminado);
      }
      
      //Hago lo mismo pero para que aparezcan las cuentas que han sido deshabilitadas
      const indiceCuentaDeshabilitada = this.cuentasDeshabilitadas.indexOf(idCuenta);
      if (indiceCuentaDeshabilitada !== -1) {
        this.cuentasDeshabilitadas.splice(indiceCuentaDeshabilitada, 1);//Quito la cuenta de la lista de deshabilitadas
      }

      //Esto es para ocultar la tabla
      if (this.cuentasSeleccionadas.length === 0) {
        this.mostrarTabla = false;
      }
    }
  }
  
  buscarNombreCuenta(id: number): string {
    const cuenta = this.cuentasApi.find((cuenta) => cuenta.id_cuenta === id);
    return cuenta ? cuenta.nombre : '';
  }
  
  guardarAsiento() {
    if (this.totalDebe !== this.totalHaber) {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La suma del debe y el haber no coincide. Por favor, revisa el asiento.',
      });
    } else {
      this.apiService.insertarAsiento(this.cuentasSeleccionadas).subscribe((response: any) => {
        console.log("Asiento guardado: ", response);
        this.router.navigate(['/asientos/list']);
      });
    }
  }
  
}
