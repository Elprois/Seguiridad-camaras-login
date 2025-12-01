import { Incidente } from '../../../domain/incidente/incidente';
import { IncidenteRepository } from '../../ports/incidente/incidente.repository';

export class UpdateIncidente {
    constructor(private readonly incidenteRepository: IncidenteRepository) {}

    async execute(id: number, incidente: Partial<Incidente>): Promise<Incidente | null> {
        return this.incidenteRepository.update(id, incidente);
    }
}
