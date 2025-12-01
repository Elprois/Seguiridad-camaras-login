export interface RegistroAsistencia {
    id_registro: number;
    id_turno: number;
    id_usuario: number;
    check_in_time: Date;
    check_out_time: Date | null;
}
