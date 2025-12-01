import { EquipoAsignado } from '../../../domain/equipo-asignado/equipo-asignado';
import { EquipoAsignadoRepository } from '../../ports/equipo-asignado/equipo-asignado.repository';

export class CreateEquipoAsignado {
    constructor(private readonly equipoAsignadoRepository: EquipoAsignadoRepository) {}

    async execute(equipoAsignado: EquipoAsignado): Promise<EquipoAsignado> {
        return this.equipoAsignadoRepository.create(equipoAsignado);
    }
}
