import { Turno } from '../../../domain/turno/turno';
import { TurnoRepository } from '../../ports/turno/turno.repository';

export class CreateTurno {
    constructor(private readonly turnoRepository: TurnoRepository) {}

    async execute(turno: Turno): Promise<Turno> {
        return this.turnoRepository.create(turno);
    }
}
