import { Certificacion } from '../../../domain/certificacion/certificacion';
import { CertificacionRepository } from '../../ports/certificacion/certificacion.repository';

export class CreateCertificacion {
    constructor(private readonly certificacionRepository: CertificacionRepository) {}

    async execute(certificacion: Certificacion): Promise<Certificacion> {
        return this.certificacionRepository.create(certificacion);
    }
}
