export interface RegistroAsistenciaEstado {
    id_usuario: number;
    nombre: string;
    apellido: string;
    estado_turno: 'CHECK-IN' | 'PENDIENTE' | 'CHECK-OUT';
    hora: string;
}
