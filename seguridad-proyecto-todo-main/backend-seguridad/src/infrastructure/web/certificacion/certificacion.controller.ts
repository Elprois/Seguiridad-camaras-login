import { Request, Response } from 'express';
import { CreateCertificacion } from '../../../application/use-cases/certificacion/create-certificacion';
import { GetCertificacion } from '../../../application/use-cases/certificacion/get-certificacion';
import { GetAllCertificaciones } from '../../../application/use-cases/certificacion/get-all-certificaciones';
import { UpdateCertificacion } from '../../../application/use-cases/certificacion/update-certificacion';
import { DeleteCertificacion } from '../../../application/use-cases/certificacion/delete-certificacion';
import { Certificacion } from '../../../domain/certificacion/certificacion';

export class CertificacionController {
    constructor(
        private readonly createCertificacion: CreateCertificacion,
        private readonly getCertificacion: GetCertificacion,
        private readonly getAllCertificaciones: GetAllCertificaciones,
        private readonly updateCertificacion: UpdateCertificacion,
        private readonly deleteCertificacion: DeleteCertificacion
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const certificacion = await this.createCertificacion.execute(req.body as Certificacion);
            res.status(201).json(certificacion);
        } catch (error) {
            res.status(500).json({ message: 'Error creating certificacion' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const certificacion = await this.getCertificacion.execute(+req.params.id);
            if (certificacion) {
                res.status(200).json(certificacion);
            } else {
                res.status(404).json({ message: 'Certificacion not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding certificacion' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const certificaciones = await this.getAllCertificaciones.execute();
            res.status(200).json(certificaciones);
        } catch (error) {
            res.status(500).json({ message: 'Error finding certificaciones' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const certificacion = await this.updateCertificacion.execute(+req.params.id, req.body as Partial<Certificacion>);
            if (certificacion) {
                res.status(200).json(certificacion);
            } else {
                res.status(404).json({ message: 'Certificacion not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating certificacion' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteCertificacion.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Certificacion not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting certificacion' });
        }
    }
}
