import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asientos-list',
  templateUrl: './asientos-list.component.html',
  styleUrls: ['./asientos-list.component.css']
})
export class AsientosListComponent implements OnInit {
  
  constructor(private http: HttpClient) { }

  asientosData: any[] = [];
  asientosAgrupados: AsientoGroup[] = [];
  
  ngOnInit() {
    this.http.get('assets/selectAsientos.json').subscribe((data: any) => {
      this.asientosData = data;
      this.asientosAgrupados = this.agruparAsientos(this.asientosData);
      console.log("Json estático asientos: ", this.asientosData);
    });
  }
  // dataSource = this.asientosData;
  displayedColumns = ['nro_asiento', 'fecha', 'codigo', 'cuenta', 'debe', 'haber'];

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
    asientos: any[]; // Aquí, any[] representa los detalles de los asientos en el grupo
  }