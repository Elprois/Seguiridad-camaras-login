import { EvidenciaIncidente } from '../../../domain/evidencia-incidente/evidencia-incidente';
import { EvidenciaIncidenteRepository } from '../../ports/evidencia-incidente/evidencia-incidente.repository';

export class GetAllEvidenciasIncidente {
    constructor(private readonly evidenciaIncidenteRepository: EvidenciaIncidenteRepository) {}

    async execute(): Promise<EvidenciaIncidente[]> {
        return this.evidenciaIncidenteRepository.findAll();
    }
}
