import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockRecordingsService } from '../../services/mock-recordings.service';
import { RecordingLog } from '../../models/recording-log.model';
import { RecordingsTableComponent } from '../recordings-table/recordings-table.component';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
    selector: 'app-recordings-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RecordingsTableComponent, TimelineComponent],
    templateUrl: './recordings-page.component.html',
    styleUrls: ['./recordings-page.component.scss']
})
export class RecordingsPageComponent implements OnInit {
    recordings: RecordingLog[] = [];
    loading = false;
    cameras: string[] = [];

    // Filtros
    filters = {
        start: '',
        end: '',
        camera: 'All',
        type: 'All'
    };

    constructor(private recordingsService: MockRecordingsService) { }

    ngOnInit(): void {
        this.loadCameras();
        this.search();
    }

    loadCameras() {
        this.recordingsService.getCameras().subscribe(cams => this.cameras = cams);
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
        alert(`Simulando reproducción de: ${rec.cameraName}\nInicio: ${rec.startTime}`);
        // TODO: Abrir modal de reproducción real
    }

    onDownload(rec: RecordingLog) {
        alert(`Descargando grabación: ${rec.id}`);
        // TODO: Implementar descarga real
    }

    onLock(rec: RecordingLog) {
        this.recordingsService.toggleLock(rec.id).subscribe(newState => {
            rec.isLocked = newState;
        });
    }
}
