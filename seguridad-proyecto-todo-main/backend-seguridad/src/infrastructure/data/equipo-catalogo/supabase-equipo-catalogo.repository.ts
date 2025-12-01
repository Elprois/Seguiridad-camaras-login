import { EquipoCatalogo } from '../../../domain/equipo-catalogo/equipo-catalogo';
import { EquipoCatalogoRepository } from '../../../application/ports/equipo-catalogo/equipo-catalogo.repository';
import { supabase } from '../supabase';

export class SupabaseEquipoCatalogoRepository implements EquipoCatalogoRepository {
    async create(equipoCatalogo: EquipoCatalogo): Promise<EquipoCatalogo> {
        const { data, error } = await supabase
            .from('equipo_catalogo')
            .insert([equipoCatalogo])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as EquipoCatalogo;
    }

    async findById(id: number): Promise<EquipoCatalogo | null> {
        const { data, error } = await supabase
            .from('equipo_catalogo')
            .select('*')
            .eq('id_equipo', id)
            .single();
        if (error) {
            return null;
        }
        return data as EquipoCatalogo;
    }

    async findAll(): Promise<EquipoCatalogo[]> {
        const { data, error } = await supabase
            .from('equipo_catalogo')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as EquipoCatalogo[];
    }

    async update(id: number, equipoCatalogo: Partial<EquipoCatalogo>): Promise<EquipoCatalogo | null> {
        const { data, error } = await supabase
            .from('equipo_catalogo')
            .update(equipoCatalogo)
            .eq('id_equipo', id)
            .single();
        if (error) {
            return null;
        }
        return data as EquipoCatalogo;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('equipo_catalogo')
            .delete()
            .eq('id_equipo', id);
        return !error;
    }
}
