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

  ngOnInit() {
    this.http.get('assets/selectAsientos.json').subscribe((data: any) => {
      this.asientosData = data;
      console.log("Json estático asientos: ", this.asientosData);
    });
  }
  dataSource = this.asientosData;
  displayedColumns = ['nro_asiento', 'fecha', 'codigo', 'cuenta', 'debe', 'haber'];

}
