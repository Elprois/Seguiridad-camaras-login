import { ZonaRepository } from '../../ports/zona/zona.repository';

export class DeleteZona {
    constructor(private readonly zonaRepository: ZonaRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.zonaRepository.delete(id);
    }
}
