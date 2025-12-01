import { EquipoAsignado } from '../../../domain/equipo-asignado/equipo-asignado';
import { EquipoAsignadoRepository } from '../../ports/equipo-asignado/equipo-asignado.repository';

export class GetAllEquiposAsignados {
    constructor(private readonly equipoAsignadoRepository: EquipoAsignadoRepository) {}

    async execute(): Promise<EquipoAsignado[]> {
        return this.equipoAsignadoRepository.findAll();
    }
}
