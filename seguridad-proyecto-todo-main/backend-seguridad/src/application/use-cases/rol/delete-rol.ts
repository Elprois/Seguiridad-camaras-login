import { RolRepository } from '../../ports/rol/rol.repository';

export class DeleteRol {
    constructor(private readonly rolRepository: RolRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.rolRepository.delete(id);
    }
}
