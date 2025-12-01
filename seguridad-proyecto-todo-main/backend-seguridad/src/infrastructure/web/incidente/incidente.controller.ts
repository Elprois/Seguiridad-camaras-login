import { Request, Response } from 'express';
import { CreateIncidente } from '../../../application/use-cases/incidente/create-incidente';
import { GetIncidente } from '../../../application/use-cases/incidente/get-incidente';
import { GetAllIncidentes } from '../../../application/use-cases/incidente/get-all-incidentes';
import { UpdateIncidente } from '../../../application/use-cases/incidente/update-incidente';
import { DeleteIncidente } from '../../../application/use-cases/incidente/delete-incidente';
import { Incidente } from '../../../domain/incidente/incidente';

export class IncidenteController {
    constructor(
        private readonly createIncidente: CreateIncidente,
        private readonly getIncidente: GetIncidente,
        private readonly getAllIncidentes: GetAllIncidentes,
        private readonly updateIncidente: UpdateIncidente,
        private readonly deleteIncidente: DeleteIncidente
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const incidente = await this.createIncidente.execute(req.body as Incidente);
            res.status(201).json(incidente);
        } catch (error) {
            res.status(500).json({ message: 'Error creating incidente' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const incidente = await this.getIncidente.execute(+req.params.id);
            if (incidente) {
                res.status(200).json(incidente);
            } else {
                res.status(404).json({ message: 'Incidente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding incidente' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const incidentes = await this.getAllIncidentes.execute();
            res.status(200).json(incidentes);
        } catch (error) {
            res.status(500).json({ message: 'Error finding incidentes' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const incidente = await this.updateIncidente.execute(+req.params.id, req.body as Partial<Incidente>);
            if (incidente) {
                res.status(200).json(incidente);
            } else {
                res.status(404).json({ message: 'Incidente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating incidente' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteIncidente.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Incidente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting incidente' });
        }
    }
}
