import { GuardiaCertificacion } from '../../../domain/guardia-certificacion/guardia-certificacion';
import { GuardiaCertificacionRepository } from '../../ports/guardia-certificacion/guardia-certificacion.repository';

export class CreateGuardiaCertificacion {
    constructor(private readonly guardiaCertificacionRepository: GuardiaCertificacionRepository) {}

    async execute(guardiaCertificacion: GuardiaCertificacion): Promise<GuardiaCertificacion> {
        return this.guardiaCertificacionRepository.create(guardiaCertificacion);
    }
}
