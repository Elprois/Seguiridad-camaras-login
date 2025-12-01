import { TiposIncidenteRepository } from '../../ports/tipos-incidente/tipos-incidente.repository';

export class DeleteTiposIncidente {
    constructor(private readonly tiposIncidenteRepository: TiposIncidenteRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.tiposIncidenteRepository.delete(id);
    }
}
