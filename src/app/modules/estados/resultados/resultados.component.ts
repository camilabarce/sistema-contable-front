import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
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
  
  fecha: string = this.mostrarFecha(); //Pongo la fecha en una variable para que no haga llamadas recurrentes
  mostrarFecha() {
    const dia = new Date().getDate().toString();
    const mes = (new Date().getMonth() + 1).toString();
    const año = new Date().getFullYear().toString();
    const fechaHeader = `${dia}/${mes}/${año}`;
    console.log(fechaHeader);
    return fechaHeader;
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

  getTotalResultadoDelEjercicio(): number {
    let total = 0;
    // Obtener la lista de rubros del resultado del ejercicio
    const resultadoEjercicio = this.parsearJson(this.patrimonioData[4][0].resultado_del_ejercicio);
    // Verificar que la lista de rubros sea un array
    if (Array.isArray(resultadoEjercicio)) {
      // Sumar los saldos de cada rubro
      resultadoEjercicio.forEach((rubro: any) => {
        total += parseFloat(rubro.saldo || 0);
      });
    }
    return total;
  }
  getGananciaPerdidaEjercicio(): string {
    const resultado = this.getTotalResultadoDelEjercicio();
    return resultado >= 0 ? 'GANANCIA' : 'PÉRDIDA';
  }
  mostrarResultadoAbsoluto(): number {
    const resultado = this.getTotalResultadoDelEjercicio();
    return Math.abs(resultado);
  }

  getTotalOrdinario(): number {
    return this.getTotales('ordinario');
  }
  getGananciaPerdidaOrdinarias(): string {
    const resultado = this.getTotalOrdinario();
    return resultado >= 0 ? 'Ganancia' : 'Pérdida';
  }
}
