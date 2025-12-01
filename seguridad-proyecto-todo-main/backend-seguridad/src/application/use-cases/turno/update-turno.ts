import { Turno } from '../../../domain/turno/turno';
import { TurnoRepository } from '../../ports/turno/turno.repository';

export class UpdateTurno {
    constructor(private readonly turnoRepository: TurnoRepository) {}

    async execute(id: number, turno: Partial<Turno>): Promise<Turno | null> {
        return this.turnoRepository.update(id, turno);
    }
}
