import { EquipoCatalogo } from '../../../domain/equipo-catalogo/equipo-catalogo';
import { EquipoCatalogoRepository } from '../../ports/equipo-catalogo/equipo-catalogo.repository';

export class UpdateEquipoCatalogo {
    constructor(private readonly equipoCatalogoRepository: EquipoCatalogoRepository) {}

    async execute(id: number, equipoCatalogo: Partial<EquipoCatalogo>): Promise<EquipoCatalogo | null> {
        return this.equipoCatalogoRepository.update(id, equipoCatalogo);
    }
}
