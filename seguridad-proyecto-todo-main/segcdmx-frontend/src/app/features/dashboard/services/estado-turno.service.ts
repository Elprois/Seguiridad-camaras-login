import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { RegistroAsistenciaEstado } from '../../../core/models/registro-asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoTurnoService {

  constructor(private api: ApiService) { }

  getEstadoPorUsuario(): Observable<RegistroAsistenciaEstado[]> {
    return this.api.get<RegistroAsistenciaEstado[]>('registros-asistencia/estado-por-usuario');
  }
}
