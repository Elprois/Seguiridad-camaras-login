import { Request, Response } from 'express';
import { CreateEquipoAsignado } from '../../../application/use-cases/equipo-asignado/create-equipo-asignado';
import { GetEquipoAsignado } from '../../../application/use-cases/equipo-asignado/get-equipo-asignado';
import { GetAllEquiposAsignados } from '../../../application/use-cases/equipo-asignado/get-all-equipos-asignados';
import { UpdateEquipoAsignado } from '../../../application/use-cases/equipo-asignado/update-equipo-asignado';
import { DeleteEquipoAsignado } from '../../../application/use-cases/equipo-asignado/delete-equipo-asignado';
import { EquipoAsignado } from '../../../domain/equipo-asignado/equipo-asignado';

export class EquipoAsignadoController {
    constructor(
        private readonly createEquipoAsignado: CreateEquipoAsignado,
        private readonly getEquipoAsignado: GetEquipoAsignado,
        private readonly getAllEquiposAsignados: GetAllEquiposAsignados,
        private readonly updateEquipoAsignado: UpdateEquipoAsignado,
        private readonly deleteEquipoAsignado: DeleteEquipoAsignado
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const equipoAsignado = await this.createEquipoAsignado.execute(req.body as EquipoAsignado);
            res.status(201).json(equipoAsignado);
        } catch (error) {
            res.status(500).json({ message: 'Error creating equipo asignado' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const equipoAsignado = await this.getEquipoAsignado.execute(+req.params.id);
            if (equipoAsignado) {
                res.status(200).json(equipoAsignado);
            } else {
                res.status(404).json({ message: 'Equipo asignado not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding equipo asignado' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const equiposAsignados = await this.getAllEquiposAsignados.execute();
            res.status(200).json(equiposAsignados);
        } catch (error) {
            res.status(500).json({ message: 'Error finding equipos asignados' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const equipoAsignado = await this.updateEquipoAsignado.execute(+req.params.id, req.body as Partial<EquipoAsignado>);
            if (equipoAsignado) {
                res.status(200).json(equipoAsignado);
            } else {
                res.status(404).json({ message: 'Equipo asignado not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating equipo asignado' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteEquipoAsignado.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Equipo asignado not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting equipo asignado' });
        }
    }
}
