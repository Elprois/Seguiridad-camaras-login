import { Zona } from '../../../domain/zona/zona';

export interface ZonaRepository {
    create(zona: Zona): Promise<Zona>;
    findById(id: number): Promise<Zona | null>;
    findAll(): Promise<Zona[]>;
    update(id: number, zona: Partial<Zona>): Promise<Zona | null>;
    delete(id: number): Promise<boolean>;
}
