import { EquipoCatalogo } from '../../../domain/equipo-catalogo/equipo-catalogo';
import { EquipoCatalogoRepository } from '../../ports/equipo-catalogo/equipo-catalogo.repository';

export class CreateEquipoCatalogo {
    constructor(private readonly equipoCatalogoRepository: EquipoCatalogoRepository) {}

    async execute(equipoCatalogo: EquipoCatalogo): Promise<EquipoCatalogo> {
        return this.equipoCatalogoRepository.create(equipoCatalogo);
    }
}
