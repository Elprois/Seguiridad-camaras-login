import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroAsistenciaEstado } from '../../../../core/models/registro-asistencia.model';
import { EstadoTurnoService } from '../../services/estado-turno.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-estado-turnos',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './estado-turnos.component.html',
  styleUrls: ['./estado-turnos.component.scss']
})
export class EstadoTurnosComponent implements OnInit {
  estados$: Observable<RegistroAsistenciaEstado[]> = new Observable();

  constructor(private estadoTurnoService: EstadoTurnoService) { }

  ngOnInit(): void {
    this.estados$ = this.estadoTurnoService.getEstadoPorUsuario();
  }
}