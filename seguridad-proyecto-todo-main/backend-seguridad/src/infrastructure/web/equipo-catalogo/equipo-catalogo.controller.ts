import { Request, Response } from 'express';
import { CreateEquipoCatalogo } from '../../../application/use-cases/equipo-catalogo/create-equipo-catalogo';
import { GetEquipoCatalogo } from '../../../application/use-cases/equipo-catalogo/get-equipo-catalogo';
import { GetAllEquiposCatalogo } from '../../../application/use-cases/equipo-catalogo/get-all-equipos-catalogo';
import { UpdateEquipoCatalogo } from '../../../application/use-cases/equipo-catalogo/update-equipo-catalogo';
import { DeleteEquipoCatalogo } from '../../../application/use-cases/equipo-catalogo/delete-equipo-catalogo';
import { EquipoCatalogo } from '../../../domain/equipo-catalogo/equipo-catalogo';

export class EquipoCatalogoController {
    constructor(
        private readonly createEquipoCatalogo: CreateEquipoCatalogo,
        private readonly getEquipoCatalogo: GetEquipoCatalogo,
        private readonly getAllEquiposCatalogo: GetAllEquiposCatalogo,
        private readonly updateEquipoCatalogo: UpdateEquipoCatalogo,
        private readonly deleteEquipoCatalogo: DeleteEquipoCatalogo
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const equipoCatalogo = await this.createEquipoCatalogo.execute(req.body as EquipoCatalogo);
            res.status(201).json(equipoCatalogo);
        } catch (error) {
            res.status(500).json({ message: 'Error creating equipo catalogo' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const equipoCatalogo = await this.getEquipoCatalogo.execute(+req.params.id);
            if (equipoCatalogo) {
                res.status(200).json(equipoCatalogo);
            } else {
                res.status(404).json({ message: 'Equipo catalogo not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding equipo catalogo' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const equiposCatalogo = await this.getAllEquiposCatalogo.execute();
            res.status(200).json(equiposCatalogo);
        } catch (error) {
            res.status(500).json({ message: 'Error finding equipos catalogo' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const equipoCatalogo = await this.updateEquipoCatalogo.execute(+req.params.id, req.body as Partial<EquipoCatalogo>);
            if (equipoCatalogo) {
                res.status(200).json(equipoCatalogo);
            } else {
                res.status(404).json({ message: 'Equipo catalogo not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating equipo catalogo' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteEquipoCatalogo.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Equipo catalogo not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting equipo catalogo' });
        }
    }
}
