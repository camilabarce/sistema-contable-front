import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api-service.service';  
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-asientos-detail',
  templateUrl: './asientos-detail.component.html',
  styleUrls: ['./asientos-detail.component.css']
})
export class AsientosDetailComponent implements OnInit {
  asientosForm: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService
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
  
  cuentaSeleccionada: number | null = null;
  debe: number | null = null;
  haber: number | null = null;  
  cuentasSeleccionadas: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.cuentasSeleccionadas);

  agregarCuenta() {
    if (this.cuentaSeleccionada !== null) {
      const cuenta = this.cuentasApi.find((cuenta) => cuenta.id_cuenta === this.cuentaSeleccionada);
      if (cuenta) {
        // Dependiendo de si el valor se ingresó en Debe o Haber, se asigna el importe correspondiente
        const importe = (this.debe !== null) ? this.debe : ((this.haber !== null) ? -this.haber : 0);
        this.cuentasSeleccionadas.push({ id_cuenta: cuenta.id_cuenta, importe });
        this.cuentaSeleccionada = null;
        this.debe = null;
        this.haber = null;

        // Actualiza el dataSource con las cuentas seleccionadas
        this.dataSource.data = this.cuentasSeleccionadas;
      }
    }
    console.log(this.cuentasSeleccionadas);
  }
  
  buscarNombreCuenta(id: number): string {
    const cuenta = this.cuentasApi.find((cuenta) => cuenta.id_cuenta === id);
    return cuenta ? cuenta.nombre : '';

  }
  
  // cuentasSeleccionadas: number[] = [];
  
  // guardarAsiento() {
  //   this.apiService.insertarAsiento(this.cuentasSeleccionadas).subscribe((response: any) => {
  //     console.log("Asiento guardado: ", response);
  //   });
  // }
}
