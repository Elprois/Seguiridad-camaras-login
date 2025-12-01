import { Incidente } from '../../../domain/incidente/incidente';

export interface IncidenteRepository {
    create(incidente: Incidente): Promise<Incidente>;
    findById(id: number): Promise<Incidente | null>;
    findAll(): Promise<Incidente[]>;
    update(id: number, incidente: Partial<Incidente>): Promise<Incidente | null>;
    delete(id: number): Promise<boolean>;
}
