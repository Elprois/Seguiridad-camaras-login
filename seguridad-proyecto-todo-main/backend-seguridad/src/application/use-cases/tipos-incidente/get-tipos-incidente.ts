import { TiposIncidente } from '../../../domain/tipos-incidente/tipos-incidente';
import { TiposIncidenteRepository } from '../../ports/tipos-incidente/tipos-incidente.repository';

export class GetTiposIncidente {
    constructor(private readonly tiposIncidenteRepository: TiposIncidenteRepository) {}

    async execute(id: number): Promise<TiposIncidente | null> {
        return this.tiposIncidenteRepository.findById(id);
    }
}
