import { Certificacion } from '../../../domain/certificacion/certificacion';
import { CertificacionRepository } from '../../ports/certificacion/certificacion.repository';

export class GetCertificacion {
    constructor(private readonly certificacionRepository: CertificacionRepository) {}

    async execute(id: number): Promise<Certificacion | null> {
        return this.certificacionRepository.findById(id);
    }
}
