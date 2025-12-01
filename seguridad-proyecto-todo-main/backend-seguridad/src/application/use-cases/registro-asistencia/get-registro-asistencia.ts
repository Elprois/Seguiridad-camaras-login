import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';
import { RegistroAsistenciaRepository } from '../../ports/registro-asistencia/registro-asistencia.repository';

export class GetRegistroAsistencia {
    constructor(private readonly registroAsistenciaRepository: RegistroAsistenciaRepository) {}

    async execute(id: number): Promise<RegistroAsistencia | null> {
        return this.registroAsistenciaRepository.findById(id);
    }
}
