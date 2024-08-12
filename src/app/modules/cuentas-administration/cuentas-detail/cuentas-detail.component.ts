import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-cuentas-detail',
  templateUrl: './cuentas-detail.component.html',
  styleUrls: ['./cuentas-detail.component.css']
})
export class CuentasDetailComponent implements OnInit {
  nombreActual: string = '';
  codigoCuenta: string = '';
  nuevoNombre: string = '';

  cuentasForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.cuentasForm = this.fb.group({
      nuevoNombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.nombreActual = params['nombreActual'];
      this.codigoCuenta = params['codigoCuenta'];
    });
  }

  mostrarNombreActual() {
    // this.cuentasForm.get('nuevoNombre')?.setValue(this.nombreActual);
    return this.nombreActual;
  }
  
  cambiarNombre() {
    if (this.cuentasForm.valid) {
      const nuevoNombre = this.cuentasForm.get('nuevoNombre')?.value;
      this.apiService.modificarCuenta(nuevoNombre, this.codigoCuenta, this.nombreActual).subscribe((resultado) => {
        this.router.navigate(['/cuentas/list']);
        console.log('Cambiar nombre', resultado);
      });
    }
  }
}
