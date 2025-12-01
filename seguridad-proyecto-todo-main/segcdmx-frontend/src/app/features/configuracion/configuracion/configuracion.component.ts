import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguracionComponent {
  readonly opciones = [
    'Preferencias de usuario',
    'Notificaciones',
    'Integraciones',
    'Roles y permisos',
  ];
}
