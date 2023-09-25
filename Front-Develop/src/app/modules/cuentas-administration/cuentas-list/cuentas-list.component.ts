import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-cuentas-list',
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.css']
})

export class CuentasListComponent implements OnInit {

   constructor(private http: HttpClient, private apiService: ApiService){
   }
   
   gruposBloquesRubros: any[] = [];

  ngOnInit() {
      this.http.get('assets/selectCuentas.json').subscribe((data: any) => {
        this.gruposBloquesRubros = data;
        console.log("Json estático", this.gruposBloquesRubros);
      });
  }

grupoSeleccionado: number | null = null;
bloqueSeleccionado: number | null = null;
rubroSeleccionado: number | null = null;

bloquesFiltrados: any[] = []; 
rubrosFiltrados: any[] = [];

  // Filtramos bloques y rubros

  actualizarBloquesFiltrados() {
    if (this.grupoSeleccionado !== null) {
      const grupo = this.gruposBloquesRubros[0].grupo.find((g:any) => g.id_grupo === this.grupoSeleccionado);
      if (grupo) {
        this.bloquesFiltrados = this.gruposBloquesRubros[0].bloque.filter((b:any) => b.id_grupo === grupo.id_grupo);
      }
      this.bloqueSeleccionado = null;
      this.rubroSeleccionado = null;
    }
  }
  
  actualizarRubrosFiltrados() {
    if (this.bloqueSeleccionado !== null) {
      this.rubrosFiltrados = this.gruposBloquesRubros[0].rubro.filter((r:any) => r.id_grupo === this.grupoSeleccionado && r.id_bloque === this.bloqueSeleccionado);
      this.rubroSeleccionado = null;
    }
  }

  // Consumimos las API´s
  
  cuentasData: any[] = [];
  
  mostrarCuentas() {
      if (this.grupoSeleccionado !== null && this.bloqueSeleccionado !== null && this.rubroSeleccionado !== null) {       
            this.apiService.mostrarCuentas(this.grupoSeleccionado, this.bloqueSeleccionado, this.rubroSeleccionado).subscribe((data) => {
               this.cuentasData = data;
               console.log(this.cuentasData);
            });  
      }
   }

   borrarCuenta(codigoCuenta: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cuenta?')) {
      this.apiService.borrarCuenta(codigoCuenta).subscribe((resultado) => {
        console.log("Código eliminado: ", resultado);
        this.mostrarCuentas();
      });
    }
  }
  
dataSource = this.cuentasData;
displayedColumns = ['nombre', 'codigo', 'saldo', 'acciones'];
 
}
