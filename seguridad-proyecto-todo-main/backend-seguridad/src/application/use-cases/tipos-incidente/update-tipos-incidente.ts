import { TiposIncidente } from '../../../domain/tipos-incidente/tipos-incidente';
import { TiposIncidenteRepository } from '../../ports/tipos-incidente/tipos-incidente.repository';

export class UpdateTiposIncidente {
    constructor(private readonly tiposIncidenteRepository: TiposIncidenteRepository) {}

    async execute(id: number, tiposIncidente: Partial<TiposIncidente>): Promise<TiposIncidente | null> {
        return this.tiposIncidenteRepository.update(id, tiposIncidente);
    }
}
