import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cuenta } from 'src/app/models/cuenta';
import { CuentaDataService } from 'src/app/services/cuenta-data.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-cuentas-detail',
  templateUrl: './cuentas-detail.component.html',
  styleUrls: ['./cuentas-detail.component.css']
})
export class CuentasDetailComponent implements OnInit {

  cuentasForm: FormGroup = this.fb.group({
    newname: ['', Validators.required],
    codigo: [''],
    name: ['']
  })

  constructor (private fb: FormBuilder,
    private cuentasService: CuentasService,
    private route: ActivatedRoute,
    private cuentaDataService: CuentaDataService) {  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const codigoCuenta = +params['codigo'];
      if (!isNaN(codigoCuenta)) {
        this.cargarDetalleCuenta(codigoCuenta);
      }
    });
  }

  cargarDetalleCuenta(codigoCuenta: number) {
    this.cuentaDataService.cuentasList$.subscribe(cuentas => {
      const cuenta = cuentas.find(c => c.codigo === codigoCuenta.toString());
      if (cuenta) {
        this.cuentasForm.patchValue({
          codigo: cuenta.codigo,
          name: cuenta.nombre
        });
        this.cuentasForm.disable();
      } else {
        console.error('Cuenta no encontrada');
      }
    });
  }

  modificarCuenta(nuevoNombre: string, codigoCuenta: number, nombreActual: string) {
    this.cuentasService.modificarCuenta(nuevoNombre, codigoCuenta, nombreActual).subscribe({
      next: (response: any) => {
        // Manejar la respuesta exitosa del servidor si es necesario
        console.log('Cuenta modificada con éxito', response);
      },
      error: (error: any) => {
        // Manejar el error si ocurre
        console.error('Error al modificar la cuenta', error);
      },
    });
  }
  
  guardarCambios(){

  }
}
