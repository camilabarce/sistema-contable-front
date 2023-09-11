import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cuenta } from '../models/cuenta';

@Injectable({
    providedIn: 'root'
})
export class CuentaDataService {
    private cuentasListSubject = new BehaviorSubject<Cuenta[]>([]);
    cuentasList$ = this.cuentasListSubject.asObservable();

    constructor() { }

    actualizarCuentas(cuentas: Cuenta[]) {
        this.cuentasListSubject.next(cuentas);
    }
}
