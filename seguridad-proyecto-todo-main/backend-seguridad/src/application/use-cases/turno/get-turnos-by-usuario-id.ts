import { Turno } from '../../../domain/turno/turno';
import { TurnoRepository } from '../../ports/turno/turno.repository';

export class GetTurnosByUsuarioId {
    constructor(private readonly turnoRepository: TurnoRepository) {}

    async execute(id_usuario: number): Promise<Turno[]> {
        return this.turnoRepository.findByUsuarioId(id_usuario);
    }
}
