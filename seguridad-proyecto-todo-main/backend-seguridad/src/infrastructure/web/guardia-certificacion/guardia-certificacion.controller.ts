import { Request, Response } from 'express';
import { CreateGuardiaCertificacion } from '../../../application/use-cases/guardia-certificacion/create-guardia-certificacion';
import { GetGuardiaCertificacion } from '../../../application/use-cases/guardia-certificacion/get-guardia-certificacion';
import { GetAllGuardiaCertificaciones } from '../../../application/use-cases/guardia-certificacion/get-all-guardia-certificaciones';
import { UpdateGuardiaCertificacion } from '../../../application/use-cases/guardia-certificacion/update-guardia-certificacion';
import { DeleteGuardiaCertificacion } from '../../../application/use-cases/guardia-certificacion/delete-guardia-certificacion';
import { GuardiaCertificacion } from '../../../domain/guardia-certificacion/guardia-certificacion';

export class GuardiaCertificacionController {
    constructor(
        private readonly createGuardiaCertificacion: CreateGuardiaCertificacion,
        private readonly getGuardiaCertificacion: GetGuardiaCertificacion,
        private readonly getAllGuardiaCertificaciones: GetAllGuardiaCertificaciones,
        private readonly updateGuardiaCertificacion: UpdateGuardiaCertificacion,
        private readonly deleteGuardiaCertificacion: DeleteGuardiaCertificacion
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const guardiaCertificacion = await this.createGuardiaCertificacion.execute(req.body as GuardiaCertificacion);
            res.status(201).json(guardiaCertificacion);
        } catch (error) {
            res.status(500).json({ message: 'Error creating guardia certificacion' });
        }
    }

    async findByUsuarioId(req: Request, res: Response): Promise<void> {
        try {
            const guardiaCertificaciones = await this.getGuardiaCertificacion.execute(+req.params.id_usuario);
            res.status(200).json(guardiaCertificaciones);
        } catch (error) {
            res.status(500).json({ message: 'Error finding guardia certificaciones' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const guardiaCertificaciones = await this.getAllGuardiaCertificaciones.execute();
            res.status(200).json(guardiaCertificaciones);
        } catch (error) {
            res.status(500).json({ message: 'Error finding guardia certificaciones' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const guardiaCertificacion = await this.updateGuardiaCertificacion.execute(+req.params.id_usuario, +req.params.id_certificacion, req.body as Partial<GuardiaCertificacion>);
            if (guardiaCertificacion) {
                res.status(200).json(guardiaCertificacion);
            } else {
                res.status(404).json({ message: 'Guardia certificacion not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating guardia certificacion' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteGuardiaCertificacion.execute(+req.params.id_usuario, +req.params.id_certificacion);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Guardia certificacion not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting guardia certificacion' });
        }
    }
}
