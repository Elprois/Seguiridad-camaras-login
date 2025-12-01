import { DatePipe, NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Turno } from '../../../core/models/turno.model';
import { TurnosService } from '../../../core/services/turnos.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ToastService } from '../../../shared/services/toast.service';
import { PersonalService } from '../../../core/services/personal.service';
import { Usuario } from '../../../core/models/usuario.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf, DatePipe, AsyncPipe],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TurnosComponent {
  readonly days = Array.from({ length: 31 }, (_, i) => i + 1);
  readonly guardias$: Observable<Usuario[]>;
  turnos: Turno[] = [];
  selectedTurnoId: string | null = null;
  selectedGuardiaId: number | null = null;

  constructor(
    private turnosService: TurnosService,
    private toastService: ToastService,
    private personalService: PersonalService
  ) {
    this.loadTurnos();
    this.guardias$ = this.personalService.getAll();
  }

  loadTurnos(): void {
    this.turnosService.getAll().subscribe((turnos) => (this.turnos = turnos));
  }

  selectTurno(id: string): void {
    this.selectedTurnoId = id;
  }

  assignTurno(guardiaId: number): void {
    if (!this.selectedTurnoId) {
      this.toastService.push('Selecciona un turno para asignar.', 'warning');
      return;
    }

    this.turnosService.assignTurno(this.selectedTurnoId, guardiaId).subscribe({
      next: () => {
        this.toastService.push('Turno asignado exitosamente.', 'success');
        this.loadTurnos(); // Refresh the list of shifts
        this.selectedTurnoId = null;
      },
      error: () => {
        this.toastService.push('Error al asignar el turno.', 'danger');
      },
    });
  }
}
