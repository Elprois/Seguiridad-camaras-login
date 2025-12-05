import { Router } from 'express';
import { RecordingController } from '../controllers/recording.controller';

export const recordingRouter = (controller: RecordingController) => {
    const router = Router();

    router.get('/', (req, res) => controller.getAll(req, res));
    router.get('/:id', (req, res) => controller.getById(req, res));
    router.patch('/:id/lock', (req, res) => controller.toggleLock(req, res));
    router.delete('/:id', (req, res) => controller.delete(req, res));

    return router;
};
