import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private ApiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  mostrarCuentas(grupo: number, bloque: number, rubro: number): Observable<any> {
    const url = `${this.ApiUrl}/mostrarCuentas/${grupo}/${bloque}/${rubro}`;
    return this.http.get(url);
}

  modificarCuenta(nuevoNombre: string, codigoCuenta: string, nombreActual: string){
    const urlModificar = `${this.ApiUrl}/modificarCuenta/${nuevoNombre}/${codigoCuenta}/${nombreActual}`;
    return this.http.post(urlModificar, {});
  }

  agregarCuenta(grupo: number, bloque: number, rubro: number, nuevaCuenta: string){
    const urlAgregar = `${this.ApiUrl}/agregarCuenta/${grupo}/${bloque}/${rubro}/${nuevaCuenta}`;
    return this.http.post(urlAgregar, {});
  }

  borrarCuenta(codigoCuenta: string){
    const urlBorrar = `${this.ApiUrl}/borrarCuenta/${codigoCuenta}`;
    return this.http.delete(urlBorrar, {});
  }

  seleccionarCuentasAsientos(){
    const urlSeleccionarCuentas = `${this.ApiUrl}/llenarSelectAsientos`;
    return this.http.get(urlSeleccionarCuentas);
  }

  insertarAsiento(cuentasSeleccionadas: any[]) {
    const urlInsertarAsiento = `${this.ApiUrl}/insertarAsiento`;
    return this.http.post(urlInsertarAsiento, {cuentasSeleccionadas});
  }

  mostrarAsientos() {
    const urlAsientos = `${this.ApiUrl}/mostrarAsientos`;
    return this.http.get(urlAsientos);
  }

  jsonEstadoPatrimonial() {
    const urlAsientos = `${this.ApiUrl}/situacionPatrimonial`;
    return this.http.get(urlAsientos);
  }
}
