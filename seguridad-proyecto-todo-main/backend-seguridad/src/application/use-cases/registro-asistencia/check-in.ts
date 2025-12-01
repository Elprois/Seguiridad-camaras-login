import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';
import { RegistroAsistenciaRepository } from '../../ports/registro-asistencia/registro-asistencia.repository';

export class CheckIn {
    constructor(private readonly registroAsistenciaRepository: RegistroAsistenciaRepository) {}

    async execute(id_turno: number, id_usuario: number): Promise<RegistroAsistencia | null> {
        const newRegistro: Omit<RegistroAsistencia, 'id_registro'> = {
            id_turno,
            id_usuario,
            check_in_time: new Date(),
            check_out_time: null,
        };
        return this.registroAsistenciaRepository.create(newRegistro as RegistroAsistencia);
    }
}
