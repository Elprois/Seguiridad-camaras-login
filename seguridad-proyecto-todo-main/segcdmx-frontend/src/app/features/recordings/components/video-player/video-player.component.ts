import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordingLog } from '../../models/recording-log.model';

@Component({
    selector: 'app-video-player',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
    @Input() recording: RecordingLog | null = null;
    @Output() close = new EventEmitter<void>();

    // TODO: Use real video URL from recording or fetch signed URL
    get videoUrl(): string {
        return 'assets/videos/demo.mp4'; // Placeholder
    }

    onClose() {
        this.close.emit();
    }
}
