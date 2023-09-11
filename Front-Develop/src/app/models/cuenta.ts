export class Cuenta {
    codigo: string;
    nombre: string;
    tipo: string;
    saldo: number;

    constructor(codigo: string, nombre: string, tipo: string, saldo: number) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.tipo = tipo;
        this.saldo = saldo;
    }
}