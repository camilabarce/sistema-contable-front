import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-asientos-list',
  templateUrl: './asientos-list.component.html',
  styleUrls: ['./asientos-list.component.css']
})
export class AsientosListComponent implements OnInit {
  
  constructor(private http: HttpClient, private apiService: ApiService) { }

  asientosData: any[] = [];
  asientosAgrupados: AsientoGroup[] = [];
  
  ngOnInit() {
//Esto es para visualizar los asientos estáticos del JSON
      this.http.get('assets/selectAsientos.json').subscribe((data: any) => {
        this.asientosData = data;
        this.asientosAgrupados = this.agruparAsientos(this.asientosData);
        console.log("Json estático asientos: ", this.asientosData);
      });
//Esta es la función que consumirá la API con los asientos dinámicos
    this.mostrarAsientos();
  }
  // dataSource = this.asientosData;
  displayedColumns = ['nro_asiento', 'fecha', 'codigo', 'cuenta', 'debe', 'haber'];

  mostrarAsientos() {
    this.apiService.mostrarAsientos().subscribe((data: any) => {
      this.asientosData = data;
      this.asientosAgrupados = this.agruparAsientos(this.asientosData);
      console.log("Asientos: ", this.asientosData);
      console.log("Asientos agrupados: ", this.asientosAgrupados);
    });
  }

  // Funcion para mostrar el importe en la columna Debe si es negativo y en Haber si es positivo
  mostrarDebeHaber() {
    let debe = this.asientosData.filter((asiento) => asiento.debe < 0);
    let haber = this.asientosData.filter((asiento) => asiento.haber > 0);
    if (debe) {
      return debe;
    } else {
      return haber;
    }
  }
  
  // Función para agrupar los asientos por id_asiento
  agruparAsientos(asientos: any[]): any[] {
    const asientosAgrupados: AsientoGroup[] = [];
    const asientoMap = new Map();
    for (const asiento of asientos) {
      const idAsiento = asiento.id_asiento;
      if (!asientoMap.has(idAsiento)) {
        asientoMap.set(idAsiento, []);
      }
      asientoMap.get(idAsiento).push(asiento);
    }
    asientoMap.forEach((value, key) => {
      asientosAgrupados.push({ id_asiento: key, asientos: value });
    });
    return asientosAgrupados;
  }

}
interface AsientoGroup {
  id_asiento: number;
  asientos: any[]; // any[] representa los detalles de los asientos en el grupo
}