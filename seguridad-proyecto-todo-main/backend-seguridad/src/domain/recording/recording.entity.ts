export interface Recording {
    id: string;
    cameraId: string;
    startTime: Date;
    endTime: Date;
    triggerType: 'MOTION' | 'CONTINUOUS' | 'ALARM';
    filePath: string;
    sizeBytes: number;
    isLocked: boolean;
    createdAt: Date;
}

export interface RecordingFilters {
    cameraId?: string;
    startTime?: Date;
    endTime?: Date;
    triggerType?: 'MOTION' | 'CONTINUOUS' | 'ALARM';
}
