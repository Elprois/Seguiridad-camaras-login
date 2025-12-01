import { GuardiaCertificacion } from '../../../domain/guardia-certificacion/guardia-certificacion';
import { GuardiaCertificacionRepository } from '../../ports/guardia-certificacion/guardia-certificacion.repository';

export class GetAllGuardiaCertificaciones {
    constructor(private readonly guardiaCertificacionRepository: GuardiaCertificacionRepository) {}

    async execute(): Promise<GuardiaCertificacion[]> {
        return this.guardiaCertificacionRepository.findAll();
    }
}
