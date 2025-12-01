import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { IncidentesService } from '../../../core/services/incidentes.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../../shared/components/secondary-button/secondary-button.component';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-incidente-detalle',
  standalone: true,
  imports: [
    CardComponent,
    NgIf,
    AsyncPipe,
    NgFor,
    DatePipe,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
  ],
  templateUrl: './incidente-detalle.component.html',
  styleUrl: './incidente-detalle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidenteDetalleComponent {
  readonly incidente$ = this.route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    switchMap((id) => this.incidentesService.getById(id)),
  );

  readonly evidencias = [
    { titulo: 'Evidencia 1', hora: '04:32', imagen: 'https://picsum.photos/seed/evidencia1/400/220' },
    { titulo: 'Evidencia 2', hora: '04:34', imagen: 'https://picsum.photos/seed/evidencia2/400/220' },
    { titulo: 'Evidencia 3', hora: '04:37', imagen: 'https://picsum.photos/seed/evidencia3/400/220' },
  ];

  constructor(
    private route: ActivatedRoute,
    private incidentesService: IncidentesService,
    private toastService: ToastService,
  ) {}

  validar(): void {
    this.toastService.push('Incidente validado correctamente.', 'success');
  }

  marcarFalsaAlarma(): void {
    this.toastService.push('Incidente marcado como falsa alarma.', 'warning');
  }
}
