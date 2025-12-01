import { Turno } from '../../../domain/turno/turno';

export interface TurnoRepository {
    create(turno: Turno): Promise<Turno>;
    findById(id: number): Promise<Turno | null>;
    findByUsuarioId(id_usuario: number): Promise<Turno[]>;
    findAll(): Promise<Turno[]>;
    update(id: number, turno: Partial<Turno>): Promise<Turno | null>;
    delete(id: number): Promise<boolean>;
}
