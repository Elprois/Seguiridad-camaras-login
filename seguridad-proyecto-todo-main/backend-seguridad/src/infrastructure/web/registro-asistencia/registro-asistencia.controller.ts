import { GetEstadoRegistroAsistenciaPorUsuario } from '../../../application/use-cases/registro-asistencia/get-estado-registro-asistencia-por-usuario';
import { GetActiveRegistroAsistenciaByUsuarioId } from '../../../application/use-cases/registro-asistencia/get-active-registro-asistencia-by-usuario-id';
import { Request, Response } from 'express';
import { CreateRegistroAsistencia } from '../../../application/use-cases/registro-asistencia/create-registro-asistencia';
import { GetRegistroAsistencia } from '../../../application/use-cases/registro-asistencia/get-registro-asistencia';
import { GetAllRegistrosAsistencia } from '../../../application/use-cases/registro-asistencia/get-all-registros-asistencia';
import { UpdateRegistroAsistencia } from '../../../application/use-cases/registro-asistencia/update-registro-asistencia';
import { DeleteRegistroAsistencia } from '../../../application/use-cases/registro-asistencia/delete-registro-asistencia';
import { CheckIn } from '../../../application/use-cases/registro-asistencia/check-in';
import { CheckOut } from '../../../application/use-cases/registro-asistencia/check-out';
import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';

export class RegistroAsistenciaController {
    constructor(
        private readonly createRegistroAsistencia: CreateRegistroAsistencia,
        private readonly getRegistroAsistencia: GetRegistroAsistencia,
        private readonly getAllRegistrosAsistencia: GetAllRegistrosAsistencia,
        private readonly updateRegistroAsistencia: UpdateRegistroAsistencia,
        private readonly deleteRegistroAsistencia: DeleteRegistroAsistencia,
        private readonly checkIn: CheckIn,
        private readonly checkOut: CheckOut,
        private readonly getActiveRegistroAsistenciaByUsuarioId: GetActiveRegistroAsistenciaByUsuarioId,
        private readonly getEstadosPorUsuario: GetEstadoRegistroAsistenciaPorUsuario
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const registroAsistencia = await this.createRegistroAsistencia.execute(req.body as RegistroAsistencia);
            if (registroAsistencia) {
                res.status(201).json(registroAsistencia);
            } else {
                res.status(400).json({ message: 'Could not create registro asistencia' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating registro asistencia' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const registroAsistencia = await this.getRegistroAsistencia.execute(+req.params.id);
            if (registroAsistencia) {
                res.status(200).json(registroAsistencia);
            }
            else {
                res.status(404).json({ message: 'Registro asistencia not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding registro asistencia' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const registrosAsistencia = await this.getAllRegistrosAsistencia.execute();
            res.status(200).json(registrosAsistencia);
        } catch (error) {
            res.status(500).json({ message: 'Error finding registros asistencia' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const registroAsistencia = await this.updateRegistroAsistencia.execute(+req.params.id, req.body as Partial<RegistroAsistencia>);
            if (registroAsistencia) {
                res.status(200).json(registroAsistencia);
            } else {
                res.status(404).json({ message: 'Registro asistencia not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating registro asistencia' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteRegistroAsistencia.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Registro asistencia not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting registro asistencia' });
        }
    }

    async handleCheckIn(req: Request, res: Response): Promise<void> {
        try {
            const { id_turno, id_usuario } = req.body;
            const registroAsistencia = await this.checkIn.execute(id_turno, id_usuario);
            if (registroAsistencia) {
                res.status(201).json(registroAsistencia);
            }
            else {
                res.status(400).json({ message: 'Could not create check-in' });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Error doing check-in', error: error.message });
        }
    }

    async handleCheckOut(req: Request, res: Response): Promise<void> {
        console.log('Checking out in controller...');
        try {
            const { id } = req.params;
            const registroAsistencia = await this.checkOut.execute(+id);
            if (registroAsistencia) {
                res.status(200).json(registroAsistencia);
            } else {
                res.status(404).json({ message: 'Registro asistencia not found' });
            }
        } catch (error: any) {
            console.error('Error doing check-out:', error);
            res.status(500).json({ message: 'Error doing check-out', error: error.message });
        }
    }

    async findActiveByUsuarioId(req: Request, res: Response): Promise<void> {
        try {
            const registroAsistencia = await this.getActiveRegistroAsistenciaByUsuarioId.execute(+req.params.id);
            if (registroAsistencia) {
                res.status(200).json(registroAsistencia);
            } else {
                res.status(404).json({ message: 'Active registro asistencia not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Error finding active registro asistencia', error: error.message });
        }
    }

    async getEstadoPorUsuario(req: Request, res: Response): Promise<void> {
        try {
            const estados = await this.getEstadosPorUsuario.execute();
            res.status(200).json(estados);
        } catch (error: any) {
            console.error('Error getting estado por usuario:', error);
            res.status(500).json({ message: 'Error getting estado por usuario', error: error.message });
        }
    }
}
