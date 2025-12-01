import { EvidenciaIncidente } from '../../../domain/evidencia-incidente/evidencia-incidente';
import { EvidenciaIncidenteRepository } from '../../ports/evidencia-incidente/evidencia-incidente.repository';

export class CreateEvidenciaIncidente {
    constructor(private readonly evidenciaIncidenteRepository: EvidenciaIncidenteRepository) {}

    async execute(evidenciaIncidente: EvidenciaIncidente): Promise<EvidenciaIncidente> {
        return this.evidenciaIncidenteRepository.create(evidenciaIncidente);
    }
}
