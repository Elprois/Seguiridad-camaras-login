import { RegistroAsistenciaEstado, RegistroAsistenciaRepository } from '../../ports/registro-asistencia/registro-asistencia.repository';

export class GetEstadoRegistroAsistenciaPorUsuario {
    constructor(private readonly registroAsistenciaRepository: RegistroAsistenciaRepository) {}

    async execute(): Promise<RegistroAsistenciaEstado[]> {
        return this.registroAsistenciaRepository.getEstadoPorUsuario();
    }
}
