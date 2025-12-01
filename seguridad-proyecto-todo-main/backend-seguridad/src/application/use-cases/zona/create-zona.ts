import { Zona } from '../../../domain/zona/zona';
import { ZonaRepository } from '../../ports/zona/zona.repository';

export class CreateZona {
    constructor(private readonly zonaRepository: ZonaRepository) {}

    async execute(zona: Zona): Promise<Zona> {
        return this.zonaRepository.create(zona);
    }
}
