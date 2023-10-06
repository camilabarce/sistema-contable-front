import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api-service.service';  

@Component({
  selector: 'app-asientos-detail',
  templateUrl: './asientos-detail.component.html',
  styleUrls: ['./asientos-detail.component.css']
})
export class AsientosDetailComponent implements OnInit {
  asientosForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.asientosForm = this.fb.group({
    //   cuentas: [''],
    //   debe: [''],
    //   haber: ['']
    });
  }

  cuentasApi: any[] = [];

  ngOnInit() {
    this.apiService.seleccionarCuentasAsientos().subscribe((data: any) => {
      this.cuentasApi = data;
      console.log("Select Asientos: ", this.cuentasApi);
    });
  }

  cuentasSeleccionadas: number[] = [];
  
  guardarAsiento() {
    this.apiService.insertarAsiento(this.cuentasSeleccionadas).subscribe((response: any) => {
      console.log("Asiento guardado: ", response);
    });
  }
}
