import { RegistroAsistenciaRepository } from '../../ports/registro-asistencia/registro-asistencia.repository';

export class DeleteRegistroAsistencia {
    constructor(private readonly registroAsistenciaRepository: RegistroAsistenciaRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.registroAsistenciaRepository.delete(id);
    }
}
