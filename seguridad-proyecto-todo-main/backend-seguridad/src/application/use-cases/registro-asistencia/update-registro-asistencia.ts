import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';
import { RegistroAsistenciaRepository } from '../../ports/registro-asistencia/registro-asistencia.repository';

export class UpdateRegistroAsistencia {
    constructor(private readonly registroAsistenciaRepository: RegistroAsistenciaRepository) {}

    async execute(id: number, registroAsistencia: Partial<RegistroAsistencia>): Promise<RegistroAsistencia | null> {
        return this.registroAsistenciaRepository.update(id, registroAsistencia);
    }
}
