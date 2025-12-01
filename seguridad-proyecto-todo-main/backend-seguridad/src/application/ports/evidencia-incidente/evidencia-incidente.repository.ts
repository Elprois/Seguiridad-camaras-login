import { EvidenciaIncidente } from '../../../domain/evidencia-incidente/evidencia-incidente';

export interface EvidenciaIncidenteRepository {
    create(evidenciaIncidente: EvidenciaIncidente): Promise<EvidenciaIncidente>;
    findById(id: number): Promise<EvidenciaIncidente | null>;
    findAll(): Promise<EvidenciaIncidente[]>;
    update(id: number, evidenciaIncidente: Partial<EvidenciaIncidente>): Promise<EvidenciaIncidente | null>;
    delete(id: number): Promise<boolean>;
}
