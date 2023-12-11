import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-patrimonial',
  templateUrl: './patrimonial.component.html',
  styleUrls: ['./patrimonial.component.css']
})
export class PatrimonialComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  patrimonioData: any[] = [];
  patrimonioJson() {
    this.apiService.jsonEstadoPatrimonial().subscribe((data: any) => {
      this.patrimonioData = data;
      console.log("Patrimonio: ", this.patrimonioData);
    });

    return this.patrimonioData;
  }

  ngOnInit(){
    this.patrimonioJson();
  }

  parsearJson(cadenaJson: any): any[] {
    try {
      if (cadenaJson) {
        return JSON.parse(cadenaJson);
      } else {
        console.warn("Cadena JSON indefinida");
        return [];
      }
    } catch (error) {
      console.error("Error parseando el JSON:", error);
      return [];
    }
  }

  fecha: string = this.mostrarFecha(); //Pongo la fecha en una variable para que no haga llamadas recurrentes
  mostrarFecha() {
    const dia = new Date().getDate().toString();
    const mes = (new Date().getMonth() + 1).toString();
    const año = new Date().getFullYear().toString();
    const fechaHeader = `${dia}/${mes}/${año}`;
    console.log(fechaHeader);
    return fechaHeader;
  }
  
  getTotales(tipo: string): number {
    let total = 0;
  
    for (const grupo of this.patrimonioData) {
      // Verificar si grupo es un iterable antes de recorrerlo
      if (Symbol.iterator in Object(grupo)) {
        for (const elemento of grupo) {
          const totalArray = elemento.total;
          if (totalArray) {
            const totalObj = this.parsearJson(totalArray)[0];
            if (totalObj && totalObj[tipo] !== undefined) {
              total += parseFloat(totalObj[tipo]);
            }
          }
        }
      }
    }
    return total;
  }
  getTotalActivoCorriente(): number {
    return this.getTotales('activo_corriente');
  }
  getTotalActivoNoCorriente(): number {
    return this.getTotales('activo_no_corriente');
  }
  getTotalActivo(): number {
    return this.getTotales('activo');
  }
  getTotalPasivoCorriente(): number {
    return this.getTotales('pasivo_corriente');
  }
  getTotalPasivoNoCorriente(): number {
    return this.getTotales('pasivo_no_corriente');
  }
  getTotalPasivo(): number {
    return this.getTotales('pasivo');
  }
  getTotalPatrimonioNeto(): number {
    return this.getTotales('patrimonio_neto');
  }
  getPasivoYPatrimonioNeto(): number {
    return this.getTotales('pasivo_patrimonio_neto');
  }
}
