import { RecordingRepository } from '../../../domain/recording/recording.repository';
import { Recording, RecordingFilters } from '../../../domain/recording/recording.entity';

export class GetRecordings {
    constructor(private recordingRepository: RecordingRepository) { }

    async execute(filters: RecordingFilters): Promise<Recording[]> {
        return this.recordingRepository.findAll(filters);
    }
}
