import { TiposIncidente } from '../../../domain/tipos-incidente/tipos-incidente';
import { TiposIncidenteRepository } from '../../ports/tipos-incidente/tipos-incidente.repository';

export class GetAllTiposIncidentes {
    constructor(private readonly tiposIncidenteRepository: TiposIncidenteRepository) {}

    async execute(): Promise<TiposIncidente[]> {
        return this.tiposIncidenteRepository.findAll();
    }
}
