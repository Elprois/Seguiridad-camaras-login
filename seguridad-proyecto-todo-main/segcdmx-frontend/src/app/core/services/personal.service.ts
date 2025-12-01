import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { ApiService } from './api.service';

// Backend API models
interface UsuarioApi {
  id_usuario: number;
  id_rol: number;
  username: string;
  password_hash: string;
  nombre: string;
  apellido: string;
  estado: 'Activo' | 'Inactivo';
}

interface RolApi {
  id_rol: number;
  nombre_rol: string;
}

interface GuardiaCertificacionApi {
    id_guardia_certificacion: number;
    id_usuario: number;
    id_certificacion: number;
}

interface CertificacionApi {
    id_certificacion: number;
    nombre_certificacion: string;
}

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  constructor(private api: ApiService) {}

  private mapFromApi(api: UsuarioApi, rol?: RolApi, certificaciones?: CertificacionApi[]): Usuario {
    return {
      id_usuario: api.id_usuario,
      id_rol: api.id_rol,
      username: api.username,
      password_hash: '', // Should not be exposed on the frontend
      nombre: `${api.nombre} ${api.apellido}`,
      rol: rol?.nombre_rol ?? 'Desconocido',
      estado: api.estado,
      certificaciones: certificaciones?.map(c => c.nombre_certificacion) ?? [],
    };
  }

  private mapToApi(model: Partial<Usuario>): Partial<UsuarioApi> {
    const [nombre, ...apellidoParts] = (model.nombre ?? '').split(' ');
    return {
      nombre: nombre,
      apellido: apellidoParts.join(' '),
      estado: model.estado,
      id_rol: model.id_rol,
      username: model.username,
    };
  }

  getAll(): Observable<Usuario[]> {
    return this.api.get<UsuarioApi[]>('usuarios').pipe(
      mergeMap(apiUsuarios => {
        if (apiUsuarios.length === 0) {
          return of([]);
        }
        const calls = apiUsuarios.map(usuario =>
          forkJoin({
            usuario: of(usuario),
            rol: this.api.get<RolApi>(`rols/${usuario.id_rol}`),
            // This is a complex join, for simplicity we will mock it for now
            // A real implementation would need a dedicated backend endpoint
            certificaciones: of([{id_certificacion: 1, nombre_certificacion: 'IA'}] as CertificacionApi[])
          })
        );
        return forkJoin(calls);
      }),
      map(results => results.map(result => this.mapFromApi(result.usuario, result.rol, result.certificaciones)))
    );
  }

  getById(id: number): Observable<Usuario | undefined> {
    return this.api.get<UsuarioApi>(`usuarios/${id}`).pipe(
      mergeMap(apiUsuario => {
        if (!apiUsuario) {
          return of(undefined);
        }
        return forkJoin({
            usuario: of(apiUsuario),
            rol: this.api.get<RolApi>(`rols/${apiUsuario.id_rol}`),
            certificaciones: of([{id_certificacion: 1, nombre_certificacion: 'IA'}] as CertificacionApi[])
        }).pipe(
            map(result => this.mapFromApi(result.usuario, result.rol, result.certificaciones))
        )
      })
    );
  }

  create(username: string, password: string, nombre: string, apellido: string, id_rol: number, estado: string): Observable<boolean> {
    const payload = { username, password, nombre, apellido, id_rol, estado };
    return this.api.post<any>('usuarios', payload).pipe(
      map(response => {
        if (response && response.message === 'Usuario created successfully') {
          return true;
        }
        throw new Error('User creation failed');
      })
    );
  }

  update(id: number, changes: Partial<Usuario>): Observable<Usuario> {
    const apiChanges = this.mapToApi(changes);
    return this.api.put<UsuarioApi>(`usuarios/${id}`, apiChanges).pipe(
      map(apiUsuario => this.mapFromApi(apiUsuario))
    );
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`usuarios/${id}`);
  }
}