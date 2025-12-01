import { TiposIncidente } from '../../../domain/tipos-incidente/tipos-incidente';

export interface TiposIncidenteRepository {
    create(tiposIncidente: TiposIncidente): Promise<TiposIncidente>;
    findById(id: number): Promise<TiposIncidente | null>;
    findAll(): Promise<TiposIncidente[]>;
    update(id: number, tiposIncidente: Partial<TiposIncidente>): Promise<TiposIncidente | null>;
    delete(id: number): Promise<boolean>;
}
