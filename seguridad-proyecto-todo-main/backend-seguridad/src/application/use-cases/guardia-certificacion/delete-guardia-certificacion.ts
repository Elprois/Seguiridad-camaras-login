import { GuardiaCertificacionRepository } from '../../ports/guardia-certificacion/guardia-certificacion.repository';

export class DeleteGuardiaCertificacion {
    constructor(private readonly guardiaCertificacionRepository: GuardiaCertificacionRepository) {}

    async execute(id_usuario: number, id_certificacion: number): Promise<boolean> {
        return this.guardiaCertificacionRepository.delete(id_usuario, id_certificacion);
    }
}
