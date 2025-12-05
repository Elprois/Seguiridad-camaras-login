import { RecordingRepository } from '../../../domain/recording/recording.repository';
import { Recording } from '../../../domain/recording/recording.entity';

export class GetRecordingById {
    constructor(private recordingRepository: RecordingRepository) { }

    async execute(id: string): Promise<Recording | null> {
        return this.recordingRepository.findById(id);
    }
}
