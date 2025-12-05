import { Recording, RecordingFilters } from './recording.entity';

export interface RecordingRepository {
    findAll(filters: RecordingFilters): Promise<Recording[]>;
    findById(id: string): Promise<Recording | null>;
    create(recording: Omit<Recording, 'id' | 'createdAt'>): Promise<Recording>;
    updateLockStatus(id: string, isLocked: boolean): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
