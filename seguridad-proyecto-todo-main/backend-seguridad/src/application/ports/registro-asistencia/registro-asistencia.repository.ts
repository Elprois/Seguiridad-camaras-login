import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';

export interface RegistroAsistenciaEstado {
    id_usuario: number;
    nombre: string;
    apellido: string;
    estado_turno: 'CHECK-IN' | 'PENDIENTE' | 'CHECK-OUT';
    hora: string;
}

export interface RegistroAsistenciaRepository {
    create(registroAsistencia: RegistroAsistencia): Promise<RegistroAsistencia | null>;
    findById(id: number): Promise<RegistroAsistencia | null>;
    findActiveByUsuarioId(id_usuario: number): Promise<RegistroAsistencia | null>;
    findAll(): Promise<RegistroAsistencia[]>;
    getEstadoPorUsuario(): Promise<RegistroAsistenciaEstado[]>;
    update(id: number, registroAsistencia: Partial<RegistroAsistencia>): Promise<RegistroAsistencia | null>;
    delete(id: number): Promise<boolean>;
}
