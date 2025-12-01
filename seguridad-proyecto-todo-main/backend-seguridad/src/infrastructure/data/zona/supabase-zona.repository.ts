import { Zona } from '../../../domain/zona/zona';
import { ZonaRepository } from '../../../application/ports/zona/zona.repository';
import { supabase } from '../supabase';

export class SupabaseZonaRepository implements ZonaRepository {
    async create(zona: Zona): Promise<Zona> {
        const { data, error } = await supabase
            .from('zonas')
            .insert([zona])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as Zona;
    }

    async findById(id: number): Promise<Zona | null> {
        const { data, error } = await supabase
            .from('zonas')
            .select('*')
            .eq('id_zona', id)
            .single();
        if (error) {
            return null;
        }
        return data as Zona;
    }

    async findAll(): Promise<Zona[]> {
        const { data, error } = await supabase
            .from('zonas')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as Zona[];
    }

    async update(id: number, zona: Partial<Zona>): Promise<Zona | null> {
        const { data, error } = await supabase
            .from('zonas')
            .update(zona)
            .eq('id_zona', id)
            .single();
        if (error) {
            return null;
        }
        return data as Zona;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('zonas')
            .delete()
            .eq('id_zona', id);
        return !error;
    }
}
