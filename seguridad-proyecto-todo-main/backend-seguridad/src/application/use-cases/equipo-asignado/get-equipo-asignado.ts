import { EquipoAsignado } from '../../../domain/equipo-asignado/equipo-asignado';
import { EquipoAsignadoRepository } from '../../ports/equipo-asignado/equipo-asignado.repository';

export class GetEquipoAsignado {
    constructor(private readonly equipoAsignadoRepository: EquipoAsignadoRepository) {}

    async execute(id: number): Promise<EquipoAsignado | null> {
        return this.equipoAsignadoRepository.findById(id);
    }
}
