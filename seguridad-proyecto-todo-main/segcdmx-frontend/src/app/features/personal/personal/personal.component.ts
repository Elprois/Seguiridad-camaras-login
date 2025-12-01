import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../../../core/models/usuario.model';
import { PersonalService } from '../../../core/services/personal.service';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CardComponent, TableComponent, BadgeComponent, NgFor, AsyncPipe],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalComponent {
  private readonly filterSubject =
    new BehaviorSubject<'Todos' | 'Activo' | 'Inactivo' | 'Supervisor'>('Todos');
  readonly filter$ = this.filterSubject.asObservable();
  private readonly personal$ = this.personalService.getAll();
  readonly filteredPersonal$ = combineLatest([this.personal$, this.filterSubject]).pipe(
    map(([list, filter]) => {
      if (filter === 'Todos') return list;
      if (filter === 'Supervisor') return list.filter((user) => user.rol === 'Supervisor');
      return list.filter((user) => user.estado === filter);
    }),
  );

  readonly tabs = ['Todos', 'Activo', 'Inactivo', 'Supervisor'] as const;

  constructor(
    private personalService: PersonalService,
    private router: Router,
  ) {}

  selectTab(tab: (typeof this.tabs)[number]) {
    this.filterSubject.next(tab);
  }

  goToNuevo(): void {
    this.router.navigateByUrl('/personal/nuevo');
  }

  badgeVariant(usuario: Usuario) {
    return usuario.estado === 'Activo' ? 'success' : 'danger';
  }
}
