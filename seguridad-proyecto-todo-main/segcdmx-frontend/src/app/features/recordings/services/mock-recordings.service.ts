import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RecordingLog, TriggerType } from '../models/recording-log.model';

@Injectable({
    providedIn: 'root'
})
export class MockRecordingsService {

    // Simulación de base de datos local
    private mockData: RecordingLog[] = [
        {
            id: 'rec-001',
            cameraName: 'Cámara 1 - Acceso Principal',
            startTime: new Date(new Date().setHours(8, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(9, 30, 0)).toISOString(),
            triggerType: 'CONTINUOUS',
            thumbnailUrl: 'https://picsum.photos/seed/rec1/160/90',
            isLocked: true,
            sizeBytes: 1024 * 1024 * 500 // 500 MB
        },
        {
            id: 'rec-002',
            cameraName: 'Cámara 2 - Pasillo Central',
            startTime: new Date(new Date().setHours(10, 15, 0)).toISOString(),
            endTime: new Date(new Date().setHours(10, 15, 45)).toISOString(),
            triggerType: 'MOTION',
            thumbnailUrl: 'https://picsum.photos/seed/rec2/160/90',
            isLocked: false,
            sizeBytes: 1024 * 1024 * 15 // 15 MB
        },
        {
            id: 'rec-003',
            cameraName: 'Cámara 3 - Estacionamiento',
            startTime: new Date(new Date().setHours(14, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(14, 5, 0)).toISOString(),
            triggerType: 'ALARM',
            thumbnailUrl: 'https://picsum.photos/seed/rec3/160/90',
            isLocked: true,
            sizeBytes: 1024 * 1024 * 50 // 50 MB
        },
        {
            id: 'rec-004',
            cameraName: 'Cámara 1 - Acceso Principal',
            startTime: new Date(new Date().setHours(16, 30, 0)).toISOString(),
            endTime: new Date(new Date().setHours(16, 32, 0)).toISOString(),
            triggerType: 'MOTION',
            thumbnailUrl: 'https://picsum.photos/seed/rec4/160/90',
            isLocked: false,
            sizeBytes: 1024 * 1024 * 25 // 25 MB
        },
        {
            id: 'rec-005',
            cameraName: 'Cámara 4 - Cafetería',
            startTime: new Date(new Date().setHours(12, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(13, 0, 0)).toISOString(),
            triggerType: 'CONTINUOUS',
            thumbnailUrl: 'https://picsum.photos/seed/rec5/160/90',
            isLocked: false,
            sizeBytes: 1024 * 1024 * 350 // 350 MB
        },
        {
            id: 'rec-006',
            cameraName: 'Cámara 2 - Pasillo Central',
            startTime: new Date(new Date().setHours(18, 45, 0)).toISOString(),
            endTime: new Date(new Date().setHours(18, 46, 30)).toISOString(),
            triggerType: 'MOTION',
            thumbnailUrl: 'https://picsum.photos/seed/rec6/160/90',
            isLocked: false,
            sizeBytes: 1024 * 1024 * 30 // 30 MB
        }
    ];

    constructor() { }

    /**
     * Obtiene grabaciones filtradas.
     * TODO: Reemplazar con llamada real al backend.
     * Endpoint sugerido: GET /api/recordings?start=...&end=...&camera=...&type=...
     */
    getRecordings(filters?: {
        start?: string;
        end?: string;
        camera?: string;
        type?: string;
    }): Observable<RecordingLog[]> {
        // Simulamos latencia de red de 1 segundo
        return of(this.filterData(filters)).pipe(delay(1000));
    }

    private filterData(filters?: any): RecordingLog[] {
        if (!filters) return this.mockData;

        return this.mockData.filter(rec => {
            let match = true;

            if (filters.camera && filters.camera !== 'All') {
                match = match && rec.cameraName === filters.camera;
            }

            if (filters.type && filters.type !== 'All') {
                match = match && rec.triggerType === filters.type;
            }

            // Filtro de fecha simplificado para el mock (solo verifica si está dentro del día si se provee)
            // En producción, esto se haría en el backend con rangos precisos.

            return match;
        });
    }

    /**
     * Simula el bloqueo/desbloqueo de una grabación.
     * TODO: Conectar con endpoint PUT /api/recordings/{id}/lock
     */
    toggleLock(id: string): Observable<boolean> {
        const rec = this.mockData.find(r => r.id === id);
        if (rec) {
            rec.isLocked = !rec.isLocked;
            return of(rec.isLocked).pipe(delay(300));
        }
        return of(false);
    }

    /**
     * Obtiene lista única de cámaras para el filtro.
     */
    getCameras(): Observable<string[]> {
        const cameras = Array.from(new Set(this.mockData.map(r => r.cameraName)));
        return of(cameras).pipe(delay(500));
    }
}
