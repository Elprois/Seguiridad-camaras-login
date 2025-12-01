import { Certificacion } from '../../../domain/certificacion/certificacion';

export interface CertificacionRepository {
    create(certificacion: Certificacion): Promise<Certificacion>;
    findById(id: number): Promise<Certificacion | null>;
    findAll(): Promise<Certificacion[]>;
    update(id: number, certificacion: Partial<Certificacion>): Promise<Certificacion | null>;
    delete(id: number): Promise<boolean>;
}
