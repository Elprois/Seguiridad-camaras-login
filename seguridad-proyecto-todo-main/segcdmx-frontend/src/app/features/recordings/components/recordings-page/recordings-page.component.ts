import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecordingsService } from '../../services/recordings.service';
import { CamarasService } from '../../../../core/services/camaras.service';
import { RecordingLog } from '../../models/recording-log.model';
import { RecordingsTableComponent } from '../recordings-table/recordings-table.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { RecordingsUploadComponent } from '../recordings-upload/recordings-upload.component';

@Component({
    selector: 'app-recordings-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RecordingsTableComponent, TimelineComponent, VideoPlayerComponent, RecordingsUploadComponent],
    templateUrl: './recordings-page.component.html',
    styleUrls: ['./recordings-page.component.scss']
})
export class RecordingsPageComponent implements OnInit {
    recordings: RecordingLog[] = [];
    loading = false;
    cameras: string[] = [];
    selectedRecording: RecordingLog | null = null;
    showUploadModal = false;

    // Filtros
    filters = {
        start: '',
        end: '',
        camera: 'All',
        type: 'All'
    };

    constructor(
        private recordingsService: RecordingsService,
        private camarasService: CamarasService
    ) { }

    ngOnInit(): void {
        this.loadCameras();
        this.search();
    }

    loadCameras() {
        this.camarasService.getAll().subscribe(cams => {
            this.cameras = cams.map(c => c.nombre);
        });
    }

    search() {
        this.loading = true;
        this.recordingsService.getRecordings(this.filters).subscribe({
            next: (data) => {
                this.recordings = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading recordings', err);
                this.loading = false;
            }
        });
    }

    onPlay(rec: RecordingLog) {
        this.selectedRecording = rec;
    }

    onDownload(rec: RecordingLog) {
        // TODO: Implement actual download logic using rec.filePath or similar
        console.log('Downloading', rec);
        alert('Descarga iniciada (simulada)');
    }

    onLock(rec: RecordingLog) {
        const newStatus = !rec.isLocked;
        this.recordingsService.toggleLock(rec.id, newStatus).subscribe(success => {
            if (success) {
                rec.isLocked = newStatus;
            }
        });
    }

    onUploadComplete() {
        this.search(); // Refresh list
    }
}
