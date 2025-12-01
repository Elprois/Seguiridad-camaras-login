import { Request, Response } from 'express';
import { CreateZona } from '../../../application/use-cases/zona/create-zona';
import { GetZona } from '../../../application/use-cases/zona/get-zona';
import { GetAllZonas } from '../../../application/use-cases/zona/get-all-zonas';
import { UpdateZona } from '../../../application/use-cases/zona/update-zona';
import { DeleteZona } from '../../../application/use-cases/zona/delete-zona';
import { Zona } from '../../../domain/zona/zona';

export class ZonaController {
    constructor(
        private readonly createZona: CreateZona,
        private readonly getZona: GetZona,
        private readonly getAllZonas: GetAllZonas,
        private readonly updateZona: UpdateZona,
        private readonly deleteZona: DeleteZona
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const zona = await this.createZona.execute(req.body as Zona);
            res.status(201).json(zona);
        } catch (error) {
            res.status(500).json({ message: 'Error creating zona' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const zona = await this.getZona.execute(+req.params.id);
            if (zona) {
                res.status(200).json(zona);
            } else {
                res.status(404).json({ message: 'Zona not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding zona' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const zonas = await this.getAllZonas.execute();
            res.status(200).json(zonas);
        } catch (error) {
            res.status(500).json({ message: 'Error finding zonas' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const zona = await this.updateZona.execute(+req.params.id, req.body as Partial<Zona>);
            if (zona) {
                res.status(200).json(zona);
            } else {
                res.status(404).json({ message: 'Zona not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating zona' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteZona.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Zona not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting zona' });
        }
    }
}
