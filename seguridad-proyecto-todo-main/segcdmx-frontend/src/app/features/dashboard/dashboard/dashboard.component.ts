import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertasComponent } from '../components/alertas/alertas.component';
import { EstadoTurnosComponent } from '../components/estado-turnos/estado-turnos.component';
import { CamarasComponent } from '../../camaras/camaras/camaras.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EstadoTurnosComponent, AlertasComponent, CamarasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor() { }
}