import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  // Inject ApiService for future use
  constructor(private api: ApiService) {}

  generateResumen(fechaInicio: string, fechaFin: string): Observable<{ resumen: string }> {
    // TODO: Replace with a real API call when the backend endpoint is available.
    // Example: return this.api.get(`/reportes/resumen?inicio=${fechaInicio}&fin=${fechaFin}`);
    console.warn('generateResumen is using mock data. Backend endpoint not implemented.');
    return of({
      resumen: `Informe generado del ${fechaInicio} al ${fechaFin}. Total de 25 incidentes y 120 turnos completados.`,
    }).pipe(delay(200));
  }

  download(tipo: 'pdf' | 'excel'): Observable<string> {
    // TODO: Replace with a real API call when the backend endpoint is available.
    // Example: return this.api.get(`/reportes/descargar?tipo=${tipo}`);
    console.warn('download is using mock data. Backend endpoint not implemented.');
    return of(`Iniciando descarga del reporte en formato ${tipo.toUpperCase()}...`).pipe(delay(150));
  }
}