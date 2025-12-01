import { EquipoCatalogoRepository } from '../../ports/equipo-catalogo/equipo-catalogo.repository';

export class DeleteEquipoCatalogo {
    constructor(private readonly equipoCatalogoRepository: EquipoCatalogoRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.equipoCatalogoRepository.delete(id);
    }
}
