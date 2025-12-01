import { EvidenciaIncidente } from '../../../domain/evidencia-incidente/evidencia-incidente';
import { EvidenciaIncidenteRepository } from '../../ports/evidencia-incidente/evidencia-incidente.repository';

export class UpdateEvidenciaIncidente {
    constructor(private readonly evidenciaIncidenteRepository: EvidenciaIncidenteRepository) {}

    async execute(id: number, evidenciaIncidente: Partial<EvidenciaIncidente>): Promise<EvidenciaIncidente | null> {
        return this.evidenciaIncidenteRepository.update(id, evidenciaIncidente);
    }
}
