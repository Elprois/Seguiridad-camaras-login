import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Camara } from '../models/camara.model';
import { ApiService } from './api.service';

// Backend API model from /equipos-catalogo
interface EquipoCatalogoApi {
  id_equipo: number;
  nombre_equipo: string;
  modelo: string;
}

@Injectable({
  providedIn: 'root',
})
export class CamarasService {
  constructor(private api: ApiService) { }

  // Mapping function to convert backend model to frontend UI model
  private mapFromApi(api: EquipoCatalogoApi, index: number): Camara {
    // The backend model is very generic. We'll create placeholder data
    // for the UI fields that are missing, as instructed.
    return {
      id: `C-${api.id_equipo}`,
      nombre: api.nombre_equipo,
      // Placeholder data for fields not present in EquipoCatalogo
      ubicacion: ['Acceso Principal', 'Lobby', 'Perímetro', 'Estacionamiento'][index % 4],
      urlImagen: `https://picsum.photos/seed/segcdmx-${api.id_equipo}/400/300`,
      tieneAlerta: index % 5 === 0, // Mocked alert status
      estado: index % 7 === 0 ? 'Sin señal' : 'Operativa', // Mocked operational status
    };
  }

  private readonly storageKey = 'camara_ips';

  getAll(): Observable<Camara[]> {
    return this.api.get<EquipoCatalogoApi[]>('equipos-catalogo').pipe(
      map(apiEquipos => {
        // Fallback to mock data if API returns empty list
        if (!apiEquipos || apiEquipos.length === 0) {
          return this.getMockCameras();
        }

        const savedIps = this.getSavedIps();
        return apiEquipos.map((equipo, index) => {
          const camara = this.mapFromApi(equipo, index);
          if (savedIps[camara.id]) {
            camara.ipConfigurada = savedIps[camara.id];
          }
          return camara;
        });
      }),
      catchError(error => {
        console.warn('Error fetching cameras, using mock data', error);
        return of(this.getMockCameras());
      })
    );
  }

  private getMockCameras(): Camara[] {
    const savedIps = this.getSavedIps();
    return Array.from({ length: 4 }, (_, i) => {
      const id = `C-MOCK-${i + 1}`;
      return {
        id,
        nombre: `Cámara ${i + 1}`,
        ubicacion: ['Acceso Principal', 'Pasillo Central', 'Estacionamiento', 'Cafetería'][i],
        urlImagen: `https://picsum.photos/seed/segcdmx-${i}/400/300`,
        tieneAlerta: false,
        estado: 'Operativa',
        ipConfigurada: savedIps[id]
      };
    });
  }

  saveIp(cameraId: string, ip: string): void {
    const savedIps = this.getSavedIps();
    savedIps[cameraId] = ip;
    localStorage.setItem(this.storageKey, JSON.stringify(savedIps));
  }

  private getSavedIps(): Record<string, string> {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {};
  }

  // getById is not currently used by the component, so it is omitted for now.
}