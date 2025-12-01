import { Rol } from '../../../domain/rol/rol';
import { RolRepository } from '../../ports/rol/rol.repository';

export class CreateRol {
    constructor(private readonly rolRepository: RolRepository) {}

    async execute(rol: Rol): Promise<Rol> {
        return this.rolRepository.create(rol);
    }
}
