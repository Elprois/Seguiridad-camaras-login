import { Zona } from '../../../domain/zona/zona';
import { ZonaRepository } from '../../ports/zona/zona.repository';

export class UpdateZona {
    constructor(private readonly zonaRepository: ZonaRepository) {}

    async execute(id: number, zona: Partial<Zona>): Promise<Zona | null> {
        return this.zonaRepository.update(id, zona);
    }
}
