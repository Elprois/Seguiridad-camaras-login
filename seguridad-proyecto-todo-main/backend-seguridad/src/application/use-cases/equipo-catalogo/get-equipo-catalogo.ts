import { EquipoCatalogo } from '../../../domain/equipo-catalogo/equipo-catalogo';
import { EquipoCatalogoRepository } from '../../ports/equipo-catalogo/equipo-catalogo.repository';

export class GetEquipoCatalogo {
    constructor(private readonly equipoCatalogoRepository: EquipoCatalogoRepository) {}

    async execute(id: number): Promise<EquipoCatalogo | null> {
        return this.equipoCatalogoRepository.findById(id);
    }
}
