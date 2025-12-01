import { EquipoCatalogo } from '../../../domain/equipo-catalogo/equipo-catalogo';
import { EquipoCatalogoRepository } from '../../ports/equipo-catalogo/equipo-catalogo.repository';

export class GetAllEquiposCatalogo {
    constructor(private readonly equipoCatalogoRepository: EquipoCatalogoRepository) {}

    async execute(): Promise<EquipoCatalogo[]> {
        return this.equipoCatalogoRepository.findAll();
    }
}
