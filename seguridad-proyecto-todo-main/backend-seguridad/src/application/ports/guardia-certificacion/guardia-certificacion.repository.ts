import { GuardiaCertificacion } from '../../../domain/guardia-certificacion/guardia-certificacion';

export interface GuardiaCertificacionRepository {
    create(guardiaCertificacion: GuardiaCertificacion): Promise<GuardiaCertificacion>;
    findByUsuarioId(id_usuario: number): Promise<GuardiaCertificacion[]>;
    findAll(): Promise<GuardiaCertificacion[]>;
    update(id_usuario: number, id_certificacion: number, guardiaCertificacion: Partial<GuardiaCertificacion>): Promise<GuardiaCertificacion | null>;
    delete(id_usuario: number, id_certificacion: number): Promise<boolean>;
}
