import { EquipoCatalogo } from '../../../domain/equipo-catalogo/equipo-catalogo';

export interface EquipoCatalogoRepository {
    create(equipoCatalogo: EquipoCatalogo): Promise<EquipoCatalogo>;
    findById(id: number): Promise<EquipoCatalogo | null>;
    findAll(): Promise<EquipoCatalogo[]>;
    update(id: number, equipoCatalogo: Partial<EquipoCatalogo>): Promise<EquipoCatalogo | null>;
    delete(id: number): Promise<boolean>;
}
