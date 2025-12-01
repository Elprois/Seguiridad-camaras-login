import { Turno } from '../../../domain/turno/turno';
import { TurnoRepository } from '../../../application/ports/turno/turno.repository';
import { supabase } from '../supabase';

export class SupabaseTurnoRepository implements TurnoRepository {
    async create(turno: Turno): Promise<Turno> {
        const { data, error } = await supabase
            .from('turnos')
            .insert([turno])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as Turno;
    }

    async findById(id: number): Promise<Turno | null> {
        const { data, error } = await supabase
            .from('turnos')
            .select('*')
            .eq('id_turno', id)
            .single();
        if (error) {
            return null;
        }
        return data as Turno;
    }

    async findByUsuarioId(id_usuario: number): Promise<Turno[]> {
        const { data, error } = await supabase
            .from('turnos')
            .select(`
                *,
                zonas (
                    nombre_zona
                )
            `)
            .eq('id_usuario', id_usuario);
        if (error) {
            throw new Error(error.message);
        }
        return data as Turno[];
    }

    async findAll(): Promise<Turno[]> {
        const { data, error } = await supabase
            .from('turnos')
            .select(`
                *,
                zonas (
                    nombre_zona
                )
            `);
        if (error) {
            throw new Error(error.message);
        }
        return data as Turno[];
    }

    async update(id: number, turno: Partial<Turno>): Promise<Turno | null> {
        const { data, error } = await supabase
            .from('turnos')
            .update(turno)
            .eq('id_turno', id)
            .single();
        if (error) {
            return null;
        }
        return data as Turno;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('turnos')
            .delete()
            .eq('id_turno', id);
        return !error;
    }
}
