import { Zona } from '../../../domain/zona/zona';
import { ZonaRepository } from '../../ports/zona/zona.repository';

export class GetZona {
    constructor(private readonly zonaRepository: ZonaRepository) {}

    async execute(id: number): Promise<Zona | null> {
        return this.zonaRepository.findById(id);
    }
}
