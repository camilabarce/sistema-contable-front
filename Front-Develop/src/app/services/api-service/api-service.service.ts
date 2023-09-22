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

  agregarCuenta(nuevaCuenta: string, grupo: number, bloque: number, rubro: number){
    const urlAgregar = `${this.ApiUrl}/agregarCuenta/${nuevaCuenta}/${grupo}/${bloque}/${rubro}`;
    return this.http.post(urlAgregar, {});
  }

  borrarCuenta(codigoCuenta: string){
    const urlBorrar = `${this.ApiUrl}/borrarCuenta/${codigoCuenta}`;
    return this.http.delete(urlBorrar, {});
  }

  mostrarAsientos(): Observable<any> {
    const url = `${this.ApiUrl}/mostrarAsientos`;
    return this.http.get(url);
  }
}
