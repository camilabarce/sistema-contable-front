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
    // this.parsearTotal();
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

  getTotalActivo(element: any): number {
    return element && element.length > 0 ? element[0].activo : 0.00;
  }

  getTotalPasivo(element: any): number {
    return element && element.length > 0 ? element[0].pasivo : 0.00;
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
  
}
