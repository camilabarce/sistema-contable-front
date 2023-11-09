import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import swal from'sweetalert2';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces'; 
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


// Dejo link de la documentacion de la libreria para PDF por si quieren personalizarlo
// https://pdfmake.github.io/docs/0.1/getting-started/client-side/
PdfMakeWrapper.setFonts(pdfFonts);

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
  mostrarBotonAgregar: boolean = false;
  mostrarBotonPdf: boolean = false;
  
  mostrarCuentas() {
      if (this.grupoSeleccionado !== null && this.bloqueSeleccionado !== null && this.rubroSeleccionado !== null) {       
            this.apiService.mostrarCuentas(this.grupoSeleccionado, this.bloqueSeleccionado, this.rubroSeleccionado).subscribe((data) => {
               this.cuentasData = data;
               console.log(this.cuentasData);
               this.mostrarBotonPdf = true;
               this.mostrarBotonAgregar = true;
            });  
      }
      return this.cuentasData;
   }

   nuevaCuenta: string = '';
   mostrarCampoNuevaCuenta: boolean = false;

   agregarCuenta() {
     if (this.grupoSeleccionado !== null && this.bloqueSeleccionado !== null && this.rubroSeleccionado !== null) {
       this.mostrarCampoNuevaCuenta = true;
        this.apiService.agregarCuenta(this.grupoSeleccionado, this.bloqueSeleccionado, this.rubroSeleccionado,this.nuevaCuenta).subscribe((resultado) => {
            console.log("Cuenta agregada: ", resultado);
            this.nuevaCuenta = '';
            this.mostrarCuentas();
        });
    }
  }

  comunicarNuevaCuenta() {
    if (this.nuevaCuenta.trim() !== '') {
        this.agregarCuenta();
        this.nuevaCuenta = '';
        this.mostrarCampoNuevaCuenta = false;
    }
  }

  cancelarNuevaCuenta(){
    this.nuevaCuenta = '';
    this.mostrarCampoNuevaCuenta = false;
  }

  borrarCuenta(codigoCuenta: string, nombreCuenta: string, saldo: number) {
    if (saldo > 0) {
      swal.fire({
        title: 'Saldo detectado',
        html: 'La cuenta "<strong>' + nombreCuenta + '</strong>" tiene <span style=color:red;>$' + saldo + '</span><br><br> No se pueden eliminar cuentas con saldo',
        icon: 'error'
      });
    }
    else if (saldo < 0) {
      swal.fire({
        title: 'Deuda detectada',
        html: 'La cuenta "<strong>' + nombreCuenta + '</strong>" tiene una deuda de <span style=color:red;>$' + Math.abs(saldo) + '</span> y no se puede eliminar',
        icon: 'error'
      });
    } else {
      swal.fire({
        title: '¿Estás seguro?',
        html: '¿Estás seguro de que deseas eliminar "<strong>' + nombreCuenta + '</strong>"?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.borrarCuenta(codigoCuenta).subscribe((resultado) => {
            console.log("Código eliminado: ", resultado);
            this.mostrarCuentas();
            swal.fire('Eliminación exitosa', 'La cuenta se ha eliminado con éxito.', 'success');
          });
        }
      });
    }
  }
  
  
dataSource = this.cuentasData;
displayedColumns = ['nombre', 'codigo', 'saldo', 'acciones'];

 async generarPdf(){
  const pdf = new PdfMakeWrapper();
  const datosParaPdf = this.cuentasData;
  const rubroElegido = this.rubrosFiltrados.find(rubro => rubro.id_rubro === this.rubroSeleccionado);

  pdf.header({text: `Cuentas del rubro: "${rubroElegido.nombre_rubro}"`, alignment: 'center', margin:[0,10], fontSize: 16});
  pdf.add(this.armarPdf(datosParaPdf));
  pdf.watermark({text: 'Plan de cuentas', color: 'red', opacity: 0.1, bold: false, italics: false, width:15});
  pdf.create().open();
}

extraerDatosParaPdf(data: any[]){
 return data.map(fila => [fila.nombre, fila.codigo, fila.tipo, fila.saldo]);
}

 armarPdf(data: any[]): ITable{
  return new Table([
    ["Nombre", "Código", "Tipo", "Saldo"],
    ...this.extraerDatosParaPdf(data)
  ])
  .alignment('center')
  .color('white')
  .fontSize(15)
  .decorationStyle('dotted')
  .widths('*')
  .heights(altura =>{
    return altura === 0 ? 30: 40;
  })
  .layout({
    fillColor: rowIndex => {
      return rowIndex === 0 ? '#484B4A' : '#852FEC';
    }
  })
  .end;
 }

}
