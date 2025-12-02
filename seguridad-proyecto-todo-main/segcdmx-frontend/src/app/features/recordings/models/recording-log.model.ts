export type TriggerType = 'MOTION' | 'CONTINUOUS' | 'ALARM';

export interface RecordingLog {
    id: string;            // uuid
    cameraName: string;
    startTime: string;     // ISO string (Date serializable)
    endTime: string;       // ISO string
    triggerType: TriggerType;
    thumbnailUrl: string;  // placeholder URL
    isLocked: boolean;
    sizeBytes?: number;    // opcional, para mostrar "Tamaño"
}
