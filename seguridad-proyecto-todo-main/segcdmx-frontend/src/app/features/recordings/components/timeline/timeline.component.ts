import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordingLog } from '../../models/recording-log.model';

@Component({
    selector: 'app-timeline',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges {
    @Input() recordings: RecordingLog[] = [];

    // Horas del día para la regla (0, 4, 8, 12, 16, 20, 24)
    hours = [0, 4, 8, 12, 16, 20, 24];

    processedBlocks: any[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['recordings']) {
            this.calculateBlocks();
        }
    }

    calculateBlocks() {
        // Asumimos que el timeline muestra 24 horas del día de la primera grabación
        // o del día actual si no hay grabaciones.
        // Para simplificar, usaremos un día fijo de 00:00 a 23:59 basado en la fecha de la primera grabación.

        if (this.recordings.length === 0) {
            this.processedBlocks = [];
            return;
        }

        // Tomamos la fecha base del primer registro
        const baseDate = new Date(this.recordings[0].startTime);
        baseDate.setHours(0, 0, 0, 0);
        const startOfDay = baseDate.getTime();
        const endOfDay = startOfDay + (24 * 60 * 60 * 1000); // +24h

        this.processedBlocks = this.recordings.map(rec => {
            const start = new Date(rec.startTime).getTime();
            const end = new Date(rec.endTime).getTime();

            // Calcular posición y ancho en porcentaje relativo al día
            // Clampear valores para que no se salgan del día
            const effectiveStart = Math.max(start, startOfDay);
            const effectiveEnd = Math.min(end, endOfDay);

            const totalDayMs = 24 * 60 * 60 * 1000;
            const leftPercent = ((effectiveStart - startOfDay) / totalDayMs) * 100;
            const widthPercent = ((effectiveEnd - effectiveStart) / totalDayMs) * 100;

            return {
                ...rec,
                style: {
                    left: `${leftPercent}%`,
                    width: `${Math.max(widthPercent, 0.5)}%` // Mínimo 0.5% para visibilidad
                }
            };
        });
    }
}
