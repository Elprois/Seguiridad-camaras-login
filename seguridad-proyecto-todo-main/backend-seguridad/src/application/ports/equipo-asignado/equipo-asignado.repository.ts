import { EquipoAsignado } from '../../../domain/equipo-asignado/equipo-asignado';

export interface EquipoAsignadoRepository {
    create(equipoAsignado: EquipoAsignado): Promise<EquipoAsignado>;
    findById(id: number): Promise<EquipoAsignado | null>;
    findAll(): Promise<EquipoAsignado[]>;
    update(id: number, equipoAsignado: Partial<EquipoAsignado>): Promise<EquipoAsignado | null>;
    delete(id: number): Promise<boolean>;
}
