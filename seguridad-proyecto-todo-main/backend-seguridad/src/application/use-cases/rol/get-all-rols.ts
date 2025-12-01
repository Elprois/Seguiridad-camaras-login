import { Rol } from '../../../domain/rol/rol';
import { RolRepository } from '../../ports/rol/rol.repository';

export class GetAllRols {
    constructor(private readonly rolRepository: RolRepository) {}

    async execute(): Promise<Rol[]> {
        return this.rolRepository.findAll();
    }
}
