export class Cuenta {
    codigo: number;
    nombre: string;
    tipo: string;

    constructor(codigo: number, nombre: string, tipo: string) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.tipo = tipo;
    }
}