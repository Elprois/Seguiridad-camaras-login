import { Request, Response } from 'express';
import { GetRecordings } from '../../../application/use-cases/recording/get-recordings';
import { GetRecordingById } from '../../../application/use-cases/recording/get-recording-by-id';
import { LockRecording } from '../../../application/use-cases/recording/lock-recording';
import { DeleteRecording } from '../../../application/use-cases/recording/delete-recording';

export class RecordingController {
    constructor(
        private getRecordings: GetRecordings,
        private getRecordingById: GetRecordingById,
        private lockRecording: LockRecording,
        private deleteRecording: DeleteRecording
    ) { }

    async getAll(req: Request, res: Response) {
        try {
            const filters = {
                cameraId: req.query.camera as string,
                triggerType: req.query.type as any,
                startTime: req.query.start ? new Date(req.query.start as string) : undefined,
                endTime: req.query.end ? new Date(req.query.end as string) : undefined
            };
            const recordings = await this.getRecordings.execute(filters);
            res.json(recordings);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const recording = await this.getRecordingById.execute(req.params.id);
            if (!recording) {
                return res.status(404).json({ error: 'Recording not found' });
            }
            res.json(recording);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async toggleLock(req: Request, res: Response) {
        try {
            const { isLocked } = req.body;
            await this.lockRecording.execute(req.params.id, isLocked);
            res.json({ success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.deleteRecording.execute(req.params.id);
            res.json({ success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
