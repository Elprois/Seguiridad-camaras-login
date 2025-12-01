import { Request, Response } from 'express';
import { CreateTiposIncidente } from '../../../application/use-cases/tipos-incidente/create-tipos-incidente';
import { GetTiposIncidente } from '../../../application/use-cases/tipos-incidente/get-tipos-incidente';
import { GetAllTiposIncidentes } from '../../../application/use-cases/tipos-incidente/get-all-tipos-incidentes';
import { UpdateTiposIncidente } from '../../../application/use-cases/tipos-incidente/update-tipos-incidente';
import { DeleteTiposIncidente } from '../../../application/use-cases/tipos-incidente/delete-tipos-incidente';
import { TiposIncidente } from '../../../domain/tipos-incidente/tipos-incidente';

export class TiposIncidenteController {
    constructor(
        private readonly createTiposIncidente: CreateTiposIncidente,
        private readonly getTiposIncidente: GetTiposIncidente,
        private readonly getAllTiposIncidentes: GetAllTiposIncidentes,
        private readonly updateTiposIncidente: UpdateTiposIncidente,
        private readonly deleteTiposIncidente: DeleteTiposIncidente
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const tiposIncidente = await this.createTiposIncidente.execute(req.body as TiposIncidente);
            res.status(201).json(tiposIncidente);
        } catch (error) {
            res.status(500).json({ message: 'Error creating tipos incidente' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const tiposIncidente = await this.getTiposIncidente.execute(+req.params.id);
            if (tiposIncidente) {
                res.status(200).json(tiposIncidente);
            } else {
                res.status(404).json({ message: 'Tipos incidente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding tipos incidente' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const tiposIncidentes = await this.getAllTiposIncidentes.execute();
            res.status(200).json(tiposIncidentes);
        } catch (error) {
            res.status(500).json({ message: 'Error finding tipos incidentes' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const tiposIncidente = await this.updateTiposIncidente.execute(+req.params.id, req.body as Partial<TiposIncidente>);
            if (tiposIncidente) {
                res.status(200).json(tiposIncidente);
            } else {
                res.status(404).json({ message: 'Tipos incidente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating tipos incidente' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteTiposIncidente.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Tipos incidente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting tipos incidente' });
        }
    }
}
