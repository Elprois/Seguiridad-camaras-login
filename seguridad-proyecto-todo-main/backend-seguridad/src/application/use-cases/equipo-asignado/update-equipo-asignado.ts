import { EquipoAsignado } from '../../../domain/equipo-asignado/equipo-asignado';
import { EquipoAsignadoRepository } from '../../ports/equipo-asignado/equipo-asignado.repository';

export class UpdateEquipoAsignado {
    constructor(private readonly equipoAsignadoRepository: EquipoAsignadoRepository) {}

    async execute(id: number, equipoAsignado: Partial<EquipoAsignado>): Promise<EquipoAsignado | null> {
        return this.equipoAsignadoRepository.update(id, equipoAsignado);
    }
}
