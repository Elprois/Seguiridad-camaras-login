import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { Incidente } from '../models/incidente.model';
import { ApiService } from './api.service';

// Backend API models
interface IncidenteApi {
  id_incidente: number;
  id_usuario_reporta: number | null;
  id_tipo_incidente: number;
  descripcion: string;
  latitud: number;
  longitud: number;
  fecha_hora_reporte: string;
  estado_validacion: 'Pendiente' | 'Validado';
  estado_sincronizacion: 'Sincronizado' | 'Pendiente';
}

interface TipoIncidenteApi {
  id_tipo_incidente: number;
  nombre_tipo: string;
}

@Injectable({
  providedIn: 'root',
})
export class IncidentesService {
  constructor(private api: ApiService) {}

  private mapFromApi(api: IncidenteApi, tipo?: TipoIncidenteApi, zona?: any): Incidente {
    return {
      id: `INC-${api.id_incidente.toString().padStart(3, '0')}`,
      fechaHora: api.fecha_hora_reporte,
      tipo: tipo?.nombre_tipo ?? 'Desconocido',
      descripcion: api.descripcion,
      estado: api.estado_validacion,
      zona: zona?.nombre_zona ?? 'Zona Desconocida',
    };
  }

  private mapToApi(model: Partial<Incidente>): Partial<IncidenteApi> {
    return {
      descripcion: model.descripcion,
      fecha_hora_reporte: model.fechaHora,
      estado_validacion: model.estado as 'Pendiente' | 'Validado' | undefined,
      id_tipo_incidente: 1, // Placeholder
      latitud: 0,
      longitud: 0,
    };
  }

  getAll(): Observable<Incidente[]> {
    return this.api.get<IncidenteApi[]>('incidentes').pipe(
      mergeMap(apiIncidentes => {
        if (apiIncidentes.length === 0) {
          return of([]);
        }
        const calls = apiIncidentes.map(incidente => 
          forkJoin({
            incidente: of(incidente),
            tipo: this.api.get<TipoIncidenteApi>(`tipos-incidente/${incidente.id_tipo_incidente}`)
            // NOTE: Zona endpoint is not available yet, so it's omitted
          })
        );
        return forkJoin(calls);
      }),
      map(results => results.map(result => this.mapFromApi(result.incidente, result.tipo)))
    );
  }

  getById(id: string): Observable<Incidente | undefined> {
    const numericId = id.replace('INC-', '');
    return this.api.get<IncidenteApi>(`incidentes/${numericId}`).pipe(
      mergeMap(apiIncidente => {
        if (!apiIncidente) {
          return of(undefined);
        }
        return forkJoin({
          incidente: of(apiIncidente),
          tipo: this.api.get<TipoIncidenteApi>(`tipos-incidente/${apiIncidente.id_tipo_incidente}`)
        }).pipe(
          map(result => this.mapFromApi(result.incidente, result.tipo))
        );
      })
    );
  }

  create(payload: Incidente): Observable<Incidente> {
    const apiPayload = this.mapToApi(payload);
    return this.api.post<IncidenteApi>('incidentes', apiPayload).pipe(
      map(apiIncidente => this.mapFromApi(apiIncidente))
    );
  }

  update(id: string, changes: Partial<Incidente>): Observable<Incidente> {
    const numericId = id.replace('INC-', '');
    const apiChanges = this.mapToApi(changes);
    return this.api.put<IncidenteApi>(`incidentes/${numericId}`, apiChanges).pipe(
      map(apiIncidente => this.mapFromApi(apiIncidente))
    );
  }

  delete(id: string): Observable<void> {
    const numericId = id.replace('INC-', '');
    return this.api.delete<void>(`incidentes/${numericId}`);
  }
}