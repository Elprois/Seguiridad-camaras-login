import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecordingLog } from '../models/recording-log.model';

@Injectable({
    providedIn: 'root'
})
export class RecordingsService {
    private readonly apiUrl = 'http://localhost:3000/recordings';

    constructor(private http: HttpClient) { }

    getRecordings(filters?: {
        start?: string;
        end?: string;
        camera?: string;
        type?: string;
    }): Observable<RecordingLog[]> {
        let params = new HttpParams();
        if (filters?.start) params = params.set('start', filters.start);
        if (filters?.end) params = params.set('end', filters.end);
        if (filters?.camera && filters.camera !== 'All') params = params.set('camera', filters.camera);
        if (filters?.type && filters.type !== 'All') params = params.set('type', filters.type);

        return this.http.get<any[]>(this.apiUrl, { params }).pipe(
            map(recordings => recordings.map(this.mapToModel))
        );
    }

    uploadRecording(formData: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/upload`, formData);
    }

    toggleLock(id: string, isLocked: boolean): Observable<boolean> {
        return this.http.patch<{ success: boolean }>(`${this.apiUrl}/${id}/lock`, { isLocked })
            .pipe(map(res => res.success));
    }

    deleteRecording(id: string): Observable<boolean> {
        return this.http.delete<{ success: boolean }>(`${this.apiUrl}/${id}`)
            .pipe(map(res => res.success));
    }

    private mapToModel(backendData: any): RecordingLog {
        return {
            id: backendData.id,
            cameraId: backendData.cameraId,
            cameraName: backendData.cameraId, // TODO: Map to real name if available
            startTime: backendData.startTime,
            endTime: backendData.endTime,
            triggerType: backendData.triggerType,
            thumbnailUrl: 'assets/images/placeholder-video.png', // Placeholder
            isLocked: backendData.isLocked,
            sizeBytes: backendData.sizeBytes
        };
    }
}
