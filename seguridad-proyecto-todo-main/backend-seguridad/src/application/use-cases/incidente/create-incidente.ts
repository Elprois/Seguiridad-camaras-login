import { Incidente } from '../../../domain/incidente/incidente';
import { IncidenteRepository } from '../../ports/incidente/incidente.repository';

export class CreateIncidente {
    constructor(private readonly incidenteRepository: IncidenteRepository) {}

    async execute(incidente: Incidente): Promise<Incidente> {
        return this.incidenteRepository.create(incidente);
    }
}
