import { Certificacion } from '../../../domain/certificacion/certificacion';
import { CertificacionRepository } from '../../ports/certificacion/certificacion.repository';

export class GetAllCertificaciones {
    constructor(private readonly certificacionRepository: CertificacionRepository) {}

    async execute(): Promise<Certificacion[]> {
        return this.certificacionRepository.findAll();
    }
}
