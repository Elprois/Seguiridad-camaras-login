import { Request, Response } from 'express';
import { CreateRol } from '../../../application/use-cases/rol/create-rol';
import { GetRol } from '../../../application/use-cases/rol/get-rol';
import { GetAllRols } from '../../../application/use-cases/rol/get-all-rols';
import { UpdateRol } from '../../../application/use-cases/rol/update-rol';
import { DeleteRol } from '../../../application/use-cases/rol/delete-rol';
import { Rol } from '../../../domain/rol/rol';

export class RolController {
    constructor(
        private readonly createRol: CreateRol,
        private readonly getRol: GetRol,
        private readonly getAllRols: GetAllRols,
        private readonly updateRol: UpdateRol,
        private readonly deleteRol: DeleteRol
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const rol = await this.createRol.execute(req.body as Rol);
            res.status(201).json(rol);
        } catch (error) {
            res.status(500).json({ message: 'Error creating rol' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const rol = await this.getRol.execute(+req.params.id);
            if (rol) {
                res.status(200).json(rol);
            } else {
                res.status(404).json({ message: 'Rol not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding rol' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const rols = await this.getAllRols.execute();
            res.status(200).json(rols);
        } catch (error) {
            res.status(500).json({ message: 'Error finding rols' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const rol = await this.updateRol.execute(+req.params.id, req.body as Partial<Rol>);
            if (rol) {
                res.status(200).json(rol);
            } else {
                res.status(404).json({ message: 'Rol not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating rol' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteRol.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Rol not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting rol' });
        }
    }
}
