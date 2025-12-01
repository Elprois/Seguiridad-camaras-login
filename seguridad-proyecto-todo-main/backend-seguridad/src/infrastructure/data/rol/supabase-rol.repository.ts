import { Rol } from '../../../domain/rol/rol';
import { RolRepository } from '../../../application/ports/rol/rol.repository';
import { supabase } from '../supabase';

export class SupabaseRolRepository implements RolRepository {
    async create(rol: Rol): Promise<Rol> {
        const { data, error } = await supabase
            .from('roles')
            .insert([rol])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as Rol;
    }

    async findById(id: number): Promise<Rol | null> {
        const { data, error } = await supabase
            .from('roles')
            .select('*')
            .eq('id_rol', id)
            .single();
        if (error) {
            return null;
        }
        return data as Rol;
    }

    async findAll(): Promise<Rol[]> {
        const { data, error } = await supabase
            .from('roles')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as Rol[];
    }

    async update(id: number, rol: Partial<Rol>): Promise<Rol | null> {
        const { data, error } = await supabase
            .from('roles')
            .update(rol)
            .eq('id_rol', id)
            .single();
        if (error) {
            return null;
        }
        return data as Rol;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('roles')
            .delete()
            .eq('id_rol', id);
        return !error;
    }
}
