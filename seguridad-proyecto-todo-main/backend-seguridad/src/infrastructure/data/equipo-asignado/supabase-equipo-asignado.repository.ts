import { EquipoAsignado } from '../../../domain/equipo-asignado/equipo-asignado';
import { EquipoAsignadoRepository } from '../../../application/ports/equipo-asignado/equipo-asignado.repository';
import { supabase } from '../supabase';

export class SupabaseEquipoAsignadoRepository implements EquipoAsignadoRepository {
    async create(equipoAsignado: EquipoAsignado): Promise<EquipoAsignado> {
        const { data, error } = await supabase
            .from('equipo_asignado')
            .insert([equipoAsignado])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as EquipoAsignado;
    }

    async findById(id: number): Promise<EquipoAsignado | null> {
        const { data, error } = await supabase
            .from('equipo_asignado')
            .select('*')
            .eq('id_asignacion', id)
            .single();
        if (error) {
            return null;
        }
        return data as EquipoAsignado;
    }

    async findAll(): Promise<EquipoAsignado[]> {
        const { data, error } = await supabase
            .from('equipo_asignado')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as EquipoAsignado[];
    }

    async update(id: number, equipoAsignado: Partial<EquipoAsignado>): Promise<EquipoAsignado | null> {
        const { data, error } = await supabase
            .from('equipo_asignado')
            .update(equipoAsignado)
            .eq('id_asignacion', id)
            .single();
        if (error) {
            return null;
        }
        return data as EquipoAsignado;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('equipo_asignado')
            .delete()
            .eq('id_asignacion', id);
        return !error;
    }
}
