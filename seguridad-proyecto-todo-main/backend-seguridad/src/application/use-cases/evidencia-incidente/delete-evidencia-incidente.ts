import { EvidenciaIncidenteRepository } from '../../ports/evidencia-incidente/evidencia-incidente.repository';

export class DeleteEvidenciaIncidente {
    constructor(private readonly evidenciaIncidenteRepository: EvidenciaIncidenteRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.evidenciaIncidenteRepository.delete(id);
    }
}
