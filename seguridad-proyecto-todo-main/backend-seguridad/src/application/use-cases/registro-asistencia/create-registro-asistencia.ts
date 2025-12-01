import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';
import { RegistroAsistenciaRepository } from '../../ports/registro-asistencia/registro-asistencia.repository';

export class CreateRegistroAsistencia {
    constructor(private readonly registroAsistenciaRepository: RegistroAsistenciaRepository) {}

    async execute(registroAsistencia: RegistroAsistencia): Promise<RegistroAsistencia | null> {
        return this.registroAsistenciaRepository.create(registroAsistencia);
    }
}
