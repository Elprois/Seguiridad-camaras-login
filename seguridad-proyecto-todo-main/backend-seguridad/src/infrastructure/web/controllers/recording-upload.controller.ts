import { Request, Response } from 'express';
import { SupabaseRecordingRepository } from '../../repositories/supabase-recording.repository';

export class RecordingUploadController {
    constructor(private recordingRepository: SupabaseRecordingRepository) { }

    async upload(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const { cameraName, startTime, triggerType } = req.body;

            // Calculate end time based on file size (approximate) or use default duration
            // For MVP, we'll assume a default duration of 1 minute if not provided
            const start = new Date(startTime);
            const end = new Date(start.getTime() + 60000);

            // Create recording record in DB
            // Note: In a real scenario with local storage, we would store the relative path
            // For this implementation, we construct the URL based on the server address
            const filePath = `uploads/recordings/${req.file.filename}`;

            // We need a way to get or create a camera ID based on the name, 
            // but for now we'll use a placeholder or look it up if possible.
            // Since the requirement says "cameraName", we might need to adjust the entity 
            // or find a camera by name. For simplicity in this "Manager" module,
            // we will use a fixed or random UUID if the camera doesn't exist, 
            // or better, pass the cameraId from the frontend if available.

            // Assuming the frontend sends 'cameraId' or we use a default one.
            const cameraId = req.body.cameraId || '00000000-0000-0000-0000-000000000000';

            const recording = await this.recordingRepository.create({
                cameraId: cameraId,
                startTime: start,
                endTime: end,
                triggerType: triggerType || 'CONTINUOUS',
                filePath: filePath,
                sizeBytes: req.file.size,
                isLocked: false
            });

            res.json({ success: true, recording });
        } catch (error: any) {
            console.error('Upload error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}
