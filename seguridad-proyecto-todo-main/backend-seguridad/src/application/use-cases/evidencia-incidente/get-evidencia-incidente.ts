import { EvidenciaIncidente } from '../../../domain/evidencia-incidente/evidencia-incidente';
import { EvidenciaIncidenteRepository } from '../../ports/evidencia-incidente/evidencia-incidente.repository';

export class GetEvidenciaIncidente {
    constructor(private readonly evidenciaIncidenteRepository: EvidenciaIncidenteRepository) {}

    async execute(id: number): Promise<EvidenciaIncidente | null> {
        return this.evidenciaIncidenteRepository.findById(id);
    }
}
