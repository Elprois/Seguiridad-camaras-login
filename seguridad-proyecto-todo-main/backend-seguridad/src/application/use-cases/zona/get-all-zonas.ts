import { Zona } from '../../../domain/zona/zona';
import { ZonaRepository } from '../../ports/zona/zona.repository';

export class GetAllZonas {
    constructor(private readonly zonaRepository: ZonaRepository) {}

    async execute(): Promise<Zona[]> {
        return this.zonaRepository.findAll();
    }
}
