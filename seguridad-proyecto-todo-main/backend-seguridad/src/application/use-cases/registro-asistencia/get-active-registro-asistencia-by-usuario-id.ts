import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';
import { RegistroAsistenciaRepository } from '../../ports/registro-asistencia/registro-asistencia.repository';

export class GetActiveRegistroAsistenciaByUsuarioId {
    constructor(private readonly registroAsistenciaRepository: RegistroAsistenciaRepository) {}

    async execute(id_usuario: number): Promise<RegistroAsistencia | null> {
        return this.registroAsistenciaRepository.findActiveByUsuarioId(id_usuario);
    }
}
