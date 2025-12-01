import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Incidente } from '../../../core/models/incidente.model';
import { IncidentesService } from '../../../core/services/incidentes.service';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-incidentes',
  standalone: true,
  imports: [
    CardComponent,
    TableComponent,
    BadgeComponent,
    PaginationComponent,
    AsyncPipe,
    NgFor,
    NgIf,
    DatePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './incidentes.component.html',
  styleUrl: './incidentes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentesComponent {
  readonly incidentes$ = this.incidentesService.getAll();
  readonly filterForm = this.fb.nonNullable.group({
    start: [''],
    end: [''],
    tipo: ['Todos'],
    estado: ['Todos'],
  });

  totalItems = 42;
  currentPage = 1;

  constructor(
    private incidentesService: IncidentesService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  badgeVariant(estado: Incidente['estado']) {
    switch (estado) {
      case 'Validado':
        return 'success';
      case 'Pendiente':
        return 'warning';
      case 'Resuelto':
        return 'info';
      case 'Falsa Alarma':
      default:
        return 'danger';
    }
  }

  applyFilters(): void {
    console.log('Filtros aplicados', this.filterForm.getRawValue());
  }

  viewDetail(id: string): void {
    this.router.navigate(['/incidentes', id]);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
