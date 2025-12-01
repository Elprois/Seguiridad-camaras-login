import { TurnoRepository } from '../../ports/turno/turno.repository';

export class DeleteTurno {
    constructor(private readonly turnoRepository: TurnoRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.turnoRepository.delete(id);
    }
}
