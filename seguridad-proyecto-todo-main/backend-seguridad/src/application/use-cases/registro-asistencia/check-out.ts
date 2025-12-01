import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';
import { RegistroAsistenciaRepository } from '../../ports/registro-asistencia/registro-asistencia.repository';

export class CheckOut {
    constructor(private readonly registroAsistenciaRepository: RegistroAsistenciaRepository) {}

    async execute(id_registro: number): Promise<RegistroAsistencia | null> {
        const updatedRegistro: Partial<RegistroAsistencia> = {
            check_out_time: new Date(),
        };
        return this.registroAsistenciaRepository.update(id_registro, updatedRegistro);
    }
}
