import { supabase } from '../data/supabase';
import { Recording, RecordingFilters } from '../../domain/recording/recording.entity';
import { RecordingRepository } from '../../domain/recording/recording.repository';

export class SupabaseRecordingRepository implements RecordingRepository {
    async findAll(filters: RecordingFilters): Promise<Recording[]> {
        let query = supabase.from('recordings').select('*');

        if (filters.cameraId) {
            query = query.eq('camera_id', filters.cameraId);
        }
        if (filters.triggerType) {
            query = query.eq('trigger_type', filters.triggerType);
        }
        if (filters.startTime) {
            query = query.gte('start_time', filters.startTime.toISOString());
        }
        if (filters.endTime) {
            query = query.lte('end_time', filters.endTime.toISOString());
        }

        const { data, error } = await query.order('start_time', { ascending: false });

        if (error) throw new Error(error.message);

        return data.map(this.mapToEntity);
    }

    async findById(id: string): Promise<Recording | null> {
        const { data, error } = await supabase
            .from('recordings')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;

        return this.mapToEntity(data);
    }

    async create(recording: Omit<Recording, 'id' | 'createdAt'>): Promise<Recording> {
        const { data, error } = await supabase
            .from('recordings')
            .insert({
                camera_id: recording.cameraId,
                start_time: recording.startTime,
                end_time: recording.endTime,
                trigger_type: recording.triggerType,
                file_path: recording.filePath,
                size_bytes: recording.sizeBytes,
                is_locked: recording.isLocked
            })
            .select()
            .single();

        if (error) throw new Error(error.message);

        return this.mapToEntity(data);
    }

    async updateLockStatus(id: string, isLocked: boolean): Promise<boolean> {
        const { error } = await supabase
            .from('recordings')
            .update({ is_locked: isLocked })
            .eq('id', id);

        if (error) throw new Error(error.message);
        return true;
    }

    async delete(id: string): Promise<boolean> {
        const { error } = await supabase
            .from('recordings')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        return true;
    }

    private mapToEntity(data: any): Recording {
        return {
            id: data.id,
            cameraId: data.camera_id,
            startTime: new Date(data.start_time),
            endTime: new Date(data.end_time),
            triggerType: data.trigger_type,
            filePath: data.file_path,
            sizeBytes: data.size_bytes,
            isLocked: data.is_locked,
            createdAt: new Date(data.created_at)
        };
    }
}
