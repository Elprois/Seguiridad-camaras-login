import { Rol } from '../../../domain/rol/rol';
import { RolRepository } from '../../ports/rol/rol.repository';

export class GetRol {
    constructor(private readonly rolRepository: RolRepository) {}

    async execute(id: number): Promise<Rol | null> {
        return this.rolRepository.findById(id);
    }
}
