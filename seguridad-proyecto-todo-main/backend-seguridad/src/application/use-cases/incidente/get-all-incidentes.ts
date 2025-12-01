import { Incidente } from '../../../domain/incidente/incidente';
import { IncidenteRepository } from '../../ports/incidente/incidente.repository';

export class GetAllIncidentes {
    constructor(private readonly incidenteRepository: IncidenteRepository) {}

    async execute(): Promise<Incidente[]> {
        return this.incidenteRepository.findAll();
    }
}
