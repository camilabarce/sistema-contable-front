import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuenta } from 'src/app/models/cuenta';
import { CuentaDataService } from 'src/app/services/cuenta-data.service';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
   selector: 'app-cuentas-list',
   templateUrl: './cuentas-list.component.html',
   styleUrls: ['./cuentas-list.component.css']
})
export class CuentasListComponent implements OnInit {

   constructor(private router: Router,
      private cuentasService: CuentasService,
      private cuentaDataService: CuentaDataService) {
   }

   ngOnInit() {
   }

   gruposBloquesRubros = [
      {
         "grupo": [
            {
               "id_grupo": 1,
               "nombre_grupo": "Activo"
            },
            {
               "id_grupo": 2,
               "nombre_grupo": "Pasivo"
            },
            {
               "id_grupo": 3,
               "nombre_grupo": "Patrimonio neto"
            },
            {
               "id_grupo": 4,
               "nombre_grupo": "Resultado"
            }
         ],
         "bloque": [
            {
               "id_bloque": 1,
               "id_grupo": 1,
               "nombre_bloque": "Corriente"
            },
            {
               "id_bloque": 2,
               "id_grupo": 1,
               "nombre_bloque": "No corriente"
            },
            {
               "id_bloque": 1,
               "id_grupo": 2,
               "nombre_bloque": "Corriente"
            },
            {
               "id_bloque": 2,
               "id_grupo": 2,
               "nombre_bloque": "No corriente"
            },
            {
               "id_bloque": 3,
               "id_grupo": 3,
               "nombre_bloque": "Capital"
            },
            {
               "id_bloque": 4,
               "id_grupo": 4,
               "nombre_bloque": "Ordinario"
            },
            {
               "id_bloque": 5,
               "id_grupo": 4,
               "nombre_bloque": "Extraordinario"
            }
         ],
         "rubro": [
            {
               "id_rubro": 1,
               "id_bloque": 1,
               "id_grupo": 1,
               "nombre_rubro": "Caja y bancos"
            },
            {
               "id_rubro": 2,
               "id_bloque": 1,
               "id_grupo": 1,
               "nombre_rubro": "Inversiones temporarias"
            },
            {
               "id_rubro": 3,
               "id_bloque": 1,
               "id_grupo": 1,
               "nombre_rubro": "Creditos por ventas"
            },
            {
               "id_rubro": 4,
               "id_bloque": 1,
               "id_grupo": 1,
               "nombre_rubro": "Otros creditos"
            },
            {
               "id_rubro": 5,
               "id_bloque": 1,
               "id_grupo": 1,
               "nombre_rubro": "Bienes de cambio"
            },
            {
               "id_rubro": 6,
               "id_bloque": 1,
               "id_grupo": 1,
               "nombre_rubro": "Otros bienes"
            },
            {
               "id_rubro": 7,
               "id_bloque": 2,
               "id_grupo": 1,
               "nombre_rubro": "Creditos por ventas"
            },
            {
               "id_rubro": 8,
               "id_bloque": 2,
               "id_grupo": 1,
               "nombre_rubro": "Bienes de cambio"
            },
            {
               "id_rubro": 9,
               "id_bloque": 2,
               "id_grupo": 1,
               "nombre_rubro": "Participacion permanente en sociedades"
            },
            {
               "id_rubro": 10,
               "id_bloque": 2,
               "id_grupo": 1,
               "nombre_rubro": "Otras inversiones"
            },
            {
               "id_rubro": 11,
               "id_bloque": 2,
               "id_grupo": 1,
               "nombre_rubro": "Bienes de uso"
            },
            {
               "id_rubro": 12,
               "id_bloque": 2,
               "id_grupo": 1,
               "nombre_rubro": "Activos intangibles"
            },
            {
               "id_rubro": 13,
               "id_bloque": 2,
               "id_grupo": 1,
               "nombre_rubro": "Otros activos"
            },
            {
               "id_rubro": 14,
               "id_bloque": 2,
               "id_grupo": 1,
               "nombre_rubro": "Llave de negocio"
            },
            {
               "id_rubro": 15,
               "id_bloque": 1,
               "id_grupo": 2,
               "nombre_rubro": "Deudas comerciales"
            },
            {
               "id_rubro": 16,
               "id_bloque": 1,
               "id_grupo": 2,
               "nombre_rubro": "Prestamos"
            },
            {
               "id_rubro": 17,
               "id_bloque": 1,
               "id_grupo": 2,
               "nombre_rubro": "Remuneraciones y cargas sociales"
            },
            {
               "id_rubro": 18,
               "id_bloque": 1,
               "id_grupo": 2,
               "nombre_rubro": "Cargas fiscales"
            },
            {
               "id_rubro": 19,
               "id_bloque": 1,
               "id_grupo": 2,
               "nombre_rubro": "Anticipo de clientes"
            },
            {
               "id_rubro": 20,
               "id_bloque": 1,
               "id_grupo": 2,
               "nombre_rubro": "Dividendos a pagar"
            },
            {
               "id_rubro": 21,
               "id_bloque": 1,
               "id_grupo": 2,
               "nombre_rubro": "Otras deudas"
            },
            {
               "id_rubro": 22,
               "id_bloque": 1,
               "id_grupo": 2,
               "nombre_rubro": "Previsiones"
            },
            {
               "id_rubro": 23,
               "id_bloque": 2,
               "id_grupo": 2,
               "nombre_rubro": "Duedas"
            },
            {
               "id_rubro": 25,
               "id_bloque": 2,
               "id_grupo": 2,
               "nombre_rubro": "Previsiones"
            }
         ]
      }
   ];

   // !Filtrar bloques y rubros
   grupoSeleccionado: number | null = null;
   bloqueSeleccionado: number | null = null;
   rubroSeleccionado: number | null = null;

   bloquesFiltrados: any[] = [];
   rubrosFiltrados: any[] = [];

   actualizarBloquesFiltrados() {
      if (this.grupoSeleccionado !== null) {
         const grupo = this.gruposBloquesRubros[0].grupo.find(g => g.id_grupo === this.grupoSeleccionado);
         if (grupo) {
            this.bloquesFiltrados = this.gruposBloquesRubros[0].bloque.filter(b => b.id_grupo === grupo.id_grupo);
         }
         this.bloqueSeleccionado = null;
         this.rubroSeleccionado = null;
      }
   }

   actualizarRubrosFiltrados() {
      if (this.bloqueSeleccionado !== null) {
         this.rubrosFiltrados = this.gruposBloquesRubros[0].rubro.filter(r => r.id_bloque === this.bloqueSeleccionado);
         this.rubroSeleccionado = null;
      }
   }

   // !Mostrar, modificar y eliminar cuentas
   mostrarCuentas() {
      if (this.grupoSeleccionado !== null && this.bloqueSeleccionado !== null && this.rubroSeleccionado !== null) {
         this.cuentasService.mostrarCuentas(this.grupoSeleccionado, this.bloqueSeleccionado, this.rubroSeleccionado).subscribe(res => {
            if (res.body) { // Verifica si 'body' no es null
               this.cuentasList = (res.body as any[]).map(res => {
                  const cuentas = new Cuenta(res.codigo, res.nombre, res.tipo, res.saldo);
                  return cuentas;
               });
            } else {
               // Maneja el caso en el que 'body' es null 
               console.log('La respuesta no tiene un cuerpo (body).');
            }
         });
      }
   }
   cuentasList: Cuenta[] = []; // Especifica el tipo explícitamente
   dataSource = this.cuentasList;
   displayedColumns = ['codigo', 'nombre', 'tipo', 'saldo', 'acciones'];

   editarCuenta(cuenta: Cuenta){
      // Navega a la página de detalle con el código de la cuenta como parámetro
      this.router.navigate(['cuentas', 'detail', cuenta.codigo]);
   }

   borrarCuenta(){
      
   }

   // obtenerGrupoSeleccionado(): string {
   //   return this.grupos.find(grupo => grupo.id_grupo === this.grupoSeleccionado)?.nombre_grupo || '';
   // }
}
