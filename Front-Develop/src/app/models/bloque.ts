export class Bloque {
    id_bloque: number;
    nombre_bloque: string;
    id_grupo: number;

    constructor(id_bloque: number, nombre_bloque: string, id_grupo: number){
        this.id_bloque = id_bloque;
        this.nombre_bloque = nombre_bloque;
        this.id_grupo = id_grupo;
    }
}