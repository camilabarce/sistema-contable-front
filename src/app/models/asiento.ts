export class Asiento {
    id_asiento: number;
    fecha: Date;
    id_cuenta: number;

    constructor(id_asiento: number, fecha: Date, id_cuenta: number) {
        this.id_asiento = id_asiento;
        this.fecha = fecha;
        this.id_cuenta = id_cuenta;
    }
}