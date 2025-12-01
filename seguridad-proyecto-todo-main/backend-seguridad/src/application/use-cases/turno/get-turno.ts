import { Turno } from '../../../domain/turno/turno';
import { TurnoRepository } from '../../ports/turno/turno.repository';

export class GetTurno {
    constructor(private readonly turnoRepository: TurnoRepository) {}

    async execute(id: number): Promise<Turno | null> {
        return this.turnoRepository.findById(id);
    }
}
