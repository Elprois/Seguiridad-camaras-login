import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Rol } from '../models/rol.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Rol[]> {
    return this.api.get<Rol[]>('rols');
  }
}
