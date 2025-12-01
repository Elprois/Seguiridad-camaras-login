import { GuardiaCertificacion } from '../../../domain/guardia-certificacion/guardia-certificacion';
import { GuardiaCertificacionRepository } from '../../ports/guardia-certificacion/guardia-certificacion.repository';

export class GetGuardiaCertificacion {
    constructor(private readonly guardiaCertificacionRepository: GuardiaCertificacionRepository) {}

    async execute(id_usuario: number): Promise<GuardiaCertificacion[]> {
        return this.guardiaCertificacionRepository.findByUsuarioId(id_usuario);
    }
}
