import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';
import { RegistroAsistenciaRepository } from '../../ports/registro-asistencia/registro-asistencia.repository';

export class GetAllRegistrosAsistencia {
    constructor(private readonly registroAsistenciaRepository: RegistroAsistenciaRepository) {}

    async execute(): Promise<RegistroAsistencia[]> {
        return this.registroAsistenciaRepository.findAll();
    }
}
