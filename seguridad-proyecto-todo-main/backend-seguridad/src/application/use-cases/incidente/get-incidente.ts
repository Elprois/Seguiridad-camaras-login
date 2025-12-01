import { Incidente } from '../../../domain/incidente/incidente';
import { IncidenteRepository } from '../../ports/incidente/incidente.repository';

export class GetIncidente {
    constructor(private readonly incidenteRepository: IncidenteRepository) {}

    async execute(id: number): Promise<Incidente | null> {
        return this.incidenteRepository.findById(id);
    }
}
