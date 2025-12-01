import { CertificacionRepository } from '../../ports/certificacion/certificacion.repository';

export class DeleteCertificacion {
    constructor(private readonly certificacionRepository: CertificacionRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.certificacionRepository.delete(id);
    }
}
