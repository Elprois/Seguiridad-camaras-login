import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordingLog } from '../../models/recording-log.model';

@Component({
    selector: 'app-recordings-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recordings-table.component.html',
    styleUrls: ['./recordings-table.component.scss']
})
export class RecordingsTableComponent {
    @Input() recordings: RecordingLog[] = [];
    @Output() play = new EventEmitter<RecordingLog>();
    @Output() download = new EventEmitter<RecordingLog>();
    @Output() toggleLock = new EventEmitter<RecordingLog>();

    onPlay(rec: RecordingLog) {
        this.play.emit(rec);
    }

    onDownload(rec: RecordingLog) {
        this.download.emit(rec);
    }

    onLock(rec: RecordingLog) {
        this.toggleLock.emit(rec);
    }

    formatSize(bytes?: number): string {
        if (!bytes) return '—';
        const mb = bytes / (1024 * 1024);
        return mb.toFixed(1) + ' MB';
    }

    getDuration(start: string, end: string): string {
        const s = new Date(start).getTime();
        const e = new Date(end).getTime();
        const diffMs = e - s;
        const minutes = Math.floor(diffMs / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);
        return `${minutes}m ${seconds}s`;
    }
}
