import { Rol } from '../../../domain/rol/rol';

export interface RolRepository {
    create(rol: Rol): Promise<Rol>;
    findById(id: number): Promise<Rol | null>;
    findAll(): Promise<Rol[]>;
    update(id: number, rol: Partial<Rol>): Promise<Rol | null>;
    delete(id: number): Promise<boolean>;
}
