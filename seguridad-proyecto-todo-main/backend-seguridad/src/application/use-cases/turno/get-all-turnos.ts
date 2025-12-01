import { Turno } from '../../../domain/turno/turno';
import { TurnoRepository } from '../../ports/turno/turno.repository';

export class GetAllTurnos {
    constructor(private readonly turnoRepository: TurnoRepository) {}

    async execute(): Promise<Turno[]> {
        return this.turnoRepository.findAll();
    }
}
