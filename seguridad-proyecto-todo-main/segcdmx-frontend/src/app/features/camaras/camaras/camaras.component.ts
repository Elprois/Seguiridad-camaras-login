import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AlertasService } from '../../../core/services/alertas.service';

import { CamarasService } from '../../../core/services/camaras.service';
import { CamaraCardComponent } from '../../../shared/components/camara-card/camara-card.component';

@Component({
  selector: 'app-camaras',
  standalone: true,
  imports: [NgFor, CamaraCardComponent, AsyncPipe, NgClass],
  templateUrl: './camaras.component.html',
  styleUrl: './camaras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CamarasComponent implements OnInit {
  readonly camaras$ = this.camarasService.getAll();
  gridSize: 2 | 3 | 4 = 3;
  activeAlertCameraId: string | null = null;

  constructor(
    private camarasService: CamarasService,
    private alertasService: AlertasService
  ) { }

  ngOnInit(): void {
    this.alertasService.latestAlert$.subscribe(alerta => {
      if (alerta.camaraId && alerta.tipo === 'danger') {
        this.triggerCameraAlert(alerta.camaraId);
      }
    });
  }

  setGrid(size: 2 | 3 | 4): void {
    this.gridSize = size;
  }

  private triggerCameraAlert(cameraId: string): void {
    this.activeAlertCameraId = cameraId;
    // Clear alert visual after 3 seconds
    setTimeout(() => {
      if (this.activeAlertCameraId === cameraId) {
        this.activeAlertCameraId = null;
      }
    }, 3000);
  }
}
