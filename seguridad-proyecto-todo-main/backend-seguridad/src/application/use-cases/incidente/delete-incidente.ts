import { IncidenteRepository } from '../../ports/incidente/incidente.repository';

export class DeleteIncidente {
    constructor(private readonly incidenteRepository: IncidenteRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.incidenteRepository.delete(id);
    }
}
