import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-asientos-list',
  templateUrl: './asientos-list.component.html',
  styleUrls: ['./asientos-list.component.css']
})
export class AsientosListComponent implements OnInit {
  
  constructor(private apiService: ApiService) { }

  asientosData: any[] = [];
  asientosAgrupados: AsientoGroup[] = [];
  
  ngOnInit() {
    this.mostrarAsientos();
  }
  displayedColumns = ['nro_asiento', 'fecha', 'codigo', 'cuenta', 'debe', 'haber'];

  mostrarAsientos() {
    this.apiService.mostrarAsientos().subscribe((data: any) => {
      this.asientosData = data;
      this.asientosAgrupados = this.agruparAsientos(this.asientosData);
      console.log("Asientos: ", this.asientosData);
      console.log("Asientos agrupados: ", this.asientosAgrupados);
    });
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

  calcularTotalDebe(asientos: any[]) {
    let totalDebe = 0;
    for (const asiento of asientos) {
      if (asiento.importe >= 0) {
        totalDebe += asiento.importe;
      }
    }
    return totalDebe;
  }
  
  calcularTotalHaber(asientos: any[]) {
    let totalHaber = 0;
    for (const asiento of asientos) {
      if (asiento.importe < 0) {
        totalHaber -= asiento.importe; 
      }
    }
    return totalHaber;
  }
  
  
}
interface AsientoGroup {
  id_asiento: number;
  asientos: any[]; // any[] representa los detalles de los asientos en el grupo
}

