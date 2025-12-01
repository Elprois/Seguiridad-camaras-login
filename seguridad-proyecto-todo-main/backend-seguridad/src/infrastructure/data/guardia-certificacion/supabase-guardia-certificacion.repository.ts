import { GuardiaCertificacion } from '../../../domain/guardia-certificacion/guardia-certificacion';
import { GuardiaCertificacionRepository } from '../../../application/ports/guardia-certificacion/guardia-certificacion.repository';
import { supabase } from '../supabase';

export class SupabaseGuardiaCertificacionRepository implements GuardiaCertificacionRepository {
    async create(guardiaCertificacion: GuardiaCertificacion): Promise<GuardiaCertificacion> {
        const { data, error } = await supabase
            .from('guardia_certificaciones')
            .insert([guardiaCertificacion])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as GuardiaCertificacion;
    }

    async findByUsuarioId(id_usuario: number): Promise<GuardiaCertificacion[]> {
        const { data, error } = await supabase
            .from('guardia_certificaciones')
            .select('*')
            .eq('id_usuario', id_usuario);
        if (error) {
            throw new Error(error.message);
        }
        return data as GuardiaCertificacion[];
    }

    async findAll(): Promise<GuardiaCertificacion[]> {
        const { data, error } = await supabase
            .from('guardia_certificaciones')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as GuardiaCertificacion[];
    }

    async update(id_usuario: number, id_certificacion: number, guardiaCertificacion: Partial<GuardiaCertificacion>): Promise<GuardiaCertificacion | null> {
        const { data, error } = await supabase
            .from('guardia_certificaciones')
            .update(guardiaCertificacion)
            .eq('id_usuario', id_usuario)
            .eq('id_certificacion', id_certificacion)
            .single();
        if (error) {
            return null;
        }
        return data as GuardiaCertificacion;
    }

    async delete(id_usuario: number, id_certificacion: number): Promise<boolean> {
        const { error } = await supabase
            .from('guardia_certificaciones')
            .delete()
            .eq('id_usuario', id_usuario)
            .eq('id_certificacion', id_certificacion);
        return !error;
    }
}
