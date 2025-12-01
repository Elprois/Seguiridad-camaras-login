import { Request, Response } from 'express';
import { CreateEvidenciaIncidente } from '../../../application/use-cases/evidencia-incidente/create-evidencia-incidente';
import { GetEvidenciaIncidente } from '../../../application/use-cases/evidencia-incidente/get-evidencia-incidente';
import { GetAllEvidenciasIncidente } from '../../../application/use-cases/evidencia-incidente/get-all-evidencias-incidente';
import { UpdateEvidenciaIncidente } from '../../../application/use-cases/evidencia-incidente/update-evidencia-incidente';
import { DeleteEvidenciaIncidente } from '../../../application/use-cases/evidencia-incidente/delete-evidencia-incidente';
import { EvidenciaIncidente } from '../../../domain/evidencia-incidente/evidencia-incidente';

export class EvidenciaIncidenteController {
    constructor(
        private readonly createEvidenciaIncidente: CreateEvidenciaIncidente,
        private readonly getEvidenciaIncidente: GetEvidenciaIncidente,
        private readonly getAllEvidenciasIncidente: GetAllEvidenciasIncidente,
        private readonly updateEvidenciaIncidente: UpdateEvidenciaIncidente,
        private readonly deleteEvidenciaIncidente: DeleteEvidenciaIncidente
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const evidenciaIncidente = await this.createEvidenciaIncidente.execute(req.body as EvidenciaIncidente);
            res.status(201).json(evidenciaIncidente);
        } catch (error) {
            res.status(500).json({ message: 'Error creating evidencia incidente' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const evidenciaIncidente = await this.getEvidenciaIncidente.execute(+req.params.id);
            if (evidenciaIncidente) {
                res.status(200).json(evidenciaIncidente);
            } else {
                res.status(404).json({ message: 'Evidencia incidente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding evidencia incidente' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const evidenciasIncidentes = await this.getAllEvidenciasIncidente.execute();
            res.status(200).json(evidenciasIncidentes);
        } catch (error) {
            res.status(500).json({ message: 'Error finding evidencias incidentes' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const evidenciaIncidente = await this.updateEvidenciaIncidente.execute(+req.params.id, req.body as Partial<EvidenciaIncidente>);
            if (evidenciaIncidente) {
                res.status(200).json(evidenciaIncidente);
            } else {
                res.status(404).json({ message: 'Evidencia incidente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating evidencia incidente' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteEvidenciaIncidente.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Evidencia incidente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting evidencia incidente' });
        }
    }
}
