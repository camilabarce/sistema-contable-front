export class Rubro {
    id_rubro: number;
    id_bloque: number;
    id_grupo: number;
    nombre_rubro: string;

    constructor (id_rubro: number, nombre_rubro: string, id_bloque: number, id_grupo: number) {
        this.id_rubro = id_rubro;
        this.id_bloque = id_bloque;
        this.id_grupo = id_grupo;
        this.nombre_rubro = nombre_rubro;
    }
}