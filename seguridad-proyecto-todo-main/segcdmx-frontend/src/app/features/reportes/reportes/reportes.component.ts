import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from '../../../shared/components/card/card.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { ReportesService } from '../../../core/services/reportes.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule, PrimaryButtonComponent, NgIf],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesComponent {
  readonly rangoForm = this.fb.nonNullable.group({
    inicio: ['2023-11-05'],
    fin: ['2023-12-07'],
  });

  resumen = 'Seleccione un rango para generar el informe.';

  constructor(
    private fb: FormBuilder,
    private reportesService: ReportesService,
    private toastService: ToastService,
  ) {}

  generar(): void {
    const { inicio, fin } = this.rangoForm.getRawValue();
    this.reportesService.generateResumen(inicio, fin).subscribe((data) => {
      this.resumen = data.resumen;
      this.toastService.push('Informe semanal generado.', 'info');
    });
  }

  descargar(tipo: 'pdf' | 'excel'): void {
    this.reportesService.download(tipo).subscribe((msg) => this.toastService.push(msg, 'success'));
  }
}
