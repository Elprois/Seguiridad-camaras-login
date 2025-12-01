import { Rol } from '../../../domain/rol/rol';
import { RolRepository } from '../../ports/rol/rol.repository';

export class UpdateRol {
    constructor(private readonly rolRepository: RolRepository) {}

    async execute(id: number, rol: Partial<Rol>): Promise<Rol | null> {
        return this.rolRepository.update(id, rol);
    }
}
