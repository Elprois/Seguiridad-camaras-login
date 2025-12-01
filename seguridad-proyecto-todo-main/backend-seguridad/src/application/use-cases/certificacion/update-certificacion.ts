import { Certificacion } from '../../../domain/certificacion/certificacion';
import { CertificacionRepository } from '../../ports/certificacion/certificacion.repository';

export class UpdateCertificacion {
    constructor(private readonly certificacionRepository: CertificacionRepository) {}

    async execute(id: number, certificacion: Partial<Certificacion>): Promise<Certificacion | null> {
        return this.certificacionRepository.update(id, certificacion);
    }
}
