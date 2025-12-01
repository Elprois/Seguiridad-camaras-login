export interface Turno {
    id_turno: number;
    id_usuario: number;
    id_zona: number;
    fecha_hora_inicio: Date;
    fecha_hora_fin: Date;
    estado: string;
    zonas: {
        nombre_zona: string;
    };
}
