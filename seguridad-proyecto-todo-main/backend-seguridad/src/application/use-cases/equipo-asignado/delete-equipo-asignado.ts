import { EquipoAsignadoRepository } from '../../ports/equipo-asignado/equipo-asignado.repository';

export class DeleteEquipoAsignado {
    constructor(private readonly equipoAsignadoRepository: EquipoAsignadoRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.equipoAsignadoRepository.delete(id);
    }
}
