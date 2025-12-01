import { TiposIncidente } from '../../../domain/tipos-incidente/tipos-incidente';
import { TiposIncidenteRepository } from '../../ports/tipos-incidente/tipos-incidente.repository';

export class CreateTiposIncidente {
    constructor(private readonly tiposIncidenteRepository: TiposIncidenteRepository) {}

    async execute(tiposIncidente: TiposIncidente): Promise<TiposIncidente> {
        return this.tiposIncidenteRepository.create(tiposIncidente);
    }
}
