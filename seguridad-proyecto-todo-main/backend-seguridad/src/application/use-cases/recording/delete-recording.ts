import { RecordingRepository } from '../../../domain/recording/recording.repository';

export class DeleteRecording {
    constructor(private recordingRepository: RecordingRepository) { }

    async execute(id: string): Promise<boolean> {
        const recording = await this.recordingRepository.findById(id);

        if (!recording) {
            throw new Error('Recording not found');
        }

        if (recording.isLocked) {
            throw new Error('Cannot delete a locked recording');
        }

        return this.recordingRepository.delete(id);
    }
}
