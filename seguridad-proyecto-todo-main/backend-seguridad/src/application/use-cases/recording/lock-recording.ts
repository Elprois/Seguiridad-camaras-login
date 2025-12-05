import { RecordingRepository } from '../../../domain/recording/recording.repository';

export class LockRecording {
    constructor(private recordingRepository: RecordingRepository) { }

    async execute(id: string, isLocked: boolean): Promise<boolean> {
        return this.recordingRepository.updateLockStatus(id, isLocked);
    }
}
