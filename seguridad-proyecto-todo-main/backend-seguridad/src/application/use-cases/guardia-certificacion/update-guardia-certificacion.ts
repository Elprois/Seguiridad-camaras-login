import { GuardiaCertificacion } from '../../../domain/guardia-certificacion/guardia-certificacion';
import { GuardiaCertificacionRepository } from '../../ports/guardia-certificacion/guardia-certificacion.repository';

export class UpdateGuardiaCertificacion {
    constructor(private readonly guardiaCertificacionRepository: GuardiaCertificacionRepository) {}

    async execute(id_usuario: number, id_certificacion: number, guardiaCertificacion: Partial<GuardiaCertificacion>): Promise<GuardiaCertificacion | null> {
        return this.guardiaCertificacionRepository.update(id_usuario, id_certificacion, guardiaCertificacion);
    }
}
