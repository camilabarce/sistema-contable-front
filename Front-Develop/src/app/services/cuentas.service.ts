import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Cuenta } from '../models/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:3000';

  mostrarCuentas(grupo: number, bloque: number, rubro: number): Observable<HttpResponse<Cuenta[]>> {
    // Construye la URL de solicitud con los parámetros proporcionados
    const url = `${this.baseUrl}/mostrarCuentas/${grupo}/${bloque}/${rubro}`;
    return this.http.get<Cuenta[]>(url, {observe: "response"}).pipe(
      catchError(error => {
        console.log(error.message);
        return throwError(() => "Ocurrió un error");
      })
    )
  }


  modificarCuenta(nuevoNombre: string, codigoCuenta: number, nombreActual: string): Observable<any> {
    const url = `${this.baseUrl}/modificarCuenta`;

    // Construye el cuerpo de la solicitud con los parámetros
    const body = {
      nuevoNombre: nuevoNombre,
      codigoCuenta: codigoCuenta,
      nombreActual: nombreActual
    };

    return this.http.post(url, body).pipe(
      catchError(error => {
        console.log(error.message);
        return throwError(() => 'Ocurrió un error al modificar la cuenta');
      })
    );
  }
}
