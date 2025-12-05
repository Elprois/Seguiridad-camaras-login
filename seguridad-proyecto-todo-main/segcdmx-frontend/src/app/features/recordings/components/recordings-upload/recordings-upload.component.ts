import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecordingsService } from '../../services/recordings.service';
import { CamarasService } from '../../../../core/services/camaras.service';

@Component({
    selector: 'app-recordings-upload',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './recordings-upload.component.html',
    styleUrls: ['./recordings-upload.component.scss']
})
export class RecordingsUploadComponent {
    @Output() close = new EventEmitter<void>();
    @Output() uploadComplete = new EventEmitter<void>();

    selectedFile: File | null = null;
    uploading = false;

    // Form data
    cameraName = '';
    startTime = '';
    triggerType = 'CONTINUOUS';

    cameras: string[] = [];

    constructor(
        private recordingsService: RecordingsService,
        private camarasService: CamarasService
    ) {
        this.loadCameras();
        // Set default start time to now
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        this.startTime = now.toISOString().slice(0, 16);
    }

    loadCameras() {
        this.camarasService.getAll().subscribe(cams => {
            this.cameras = cams.map(c => c.nombre);
            if (this.cameras.length > 0) {
                this.cameraName = this.cameras[0];
            }
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
        }
    }

    onSubmit() {
        if (!this.selectedFile || !this.cameraName || !this.startTime) {
            return;
        }

        this.uploading = true;
        const formData = new FormData();
        formData.append('video', this.selectedFile);
        formData.append('cameraName', this.cameraName);
        formData.append('startTime', new Date(this.startTime).toISOString());
        formData.append('triggerType', this.triggerType);

        this.recordingsService.uploadRecording(formData).subscribe({
            next: () => {
                this.uploading = false;
                this.uploadComplete.emit();
                this.close.emit();
            },
            error: (err) => {
                console.error('Upload failed', err);
                this.uploading = false;
                alert('Error al subir la grabación');
            }
        });
    }

    onClose() {
        this.close.emit();
    }
}
