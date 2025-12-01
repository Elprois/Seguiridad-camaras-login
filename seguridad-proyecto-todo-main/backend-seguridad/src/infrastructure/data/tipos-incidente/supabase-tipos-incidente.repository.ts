import { TiposIncidente } from '../../../domain/tipos-incidente/tipos-incidente';
import { TiposIncidenteRepository } from '../../../application/ports/tipos-incidente/tipos-incidente.repository';
import { supabase } from '../supabase';

export class SupabaseTiposIncidenteRepository implements TiposIncidenteRepository {
    async create(tiposIncidente: TiposIncidente): Promise<TiposIncidente> {
        const { data, error } = await supabase
            .from('tipos_incidente')
            .insert([tiposIncidente])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as TiposIncidente;
    }

    async findById(id: number): Promise<TiposIncidente | null> {
        const { data, error } = await supabase
            .from('tipos_incidente')
            .select('*')
            .eq('id_tipo_incidente', id)
            .single();
        if (error) {
            return null;
        }
        return data as TiposIncidente;
    }

    async findAll(): Promise<TiposIncidente[]> {
        const { data, error } = await supabase
            .from('tipos_incidente')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as TiposIncidente[];
    }

    async update(id: number, tiposIncidente: Partial<TiposIncidente>): Promise<TiposIncidente | null> {
        const { data, error } = await supabase
            .from('tipos_incidente')
            .update(tiposIncidente)
            .eq('id_tipo_incidente', id)
            .single();
        if (error) {
            return null;
        }
        return data as TiposIncidente;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('tipos_incidente')
            .delete()
            .eq('id_tipo_incidente', id);
        return !error;
    }
}
