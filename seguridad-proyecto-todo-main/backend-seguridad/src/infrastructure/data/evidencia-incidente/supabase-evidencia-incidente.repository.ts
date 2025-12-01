import { EvidenciaIncidente } from '../../../domain/evidencia-incidente/evidencia-incidente';
import { EvidenciaIncidenteRepository } from '../../../application/ports/evidencia-incidente/evidencia-incidente.repository';
import { supabase } from '../supabase';

export class SupabaseEvidenciaIncidenteRepository implements EvidenciaIncidenteRepository {
    async create(evidenciaIncidente: EvidenciaIncidente): Promise<EvidenciaIncidente> {
        const { data, error } = await supabase
            .from('evidencias_incidente')
            .insert([evidenciaIncidente])
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data as EvidenciaIncidente;
    }

    async findById(id: number): Promise<EvidenciaIncidente | null> {
        const { data, error } = await supabase
            .from('evidencias_incidente')
            .select('*')
            .eq('id_evidencia', id)
            .single();
        if (error) {
            return null;
        }
        return data as EvidenciaIncidente;
    }

    async findAll(): Promise<EvidenciaIncidente[]> {
        const { data, error } = await supabase
            .from('evidencias_incidente')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as EvidenciaIncidente[];
    }

    async update(id: number, evidenciaIncidente: Partial<EvidenciaIncidente>): Promise<EvidenciaIncidente | null> {
        const { data, error } = await supabase
            .from('evidencias_incidente')
            .update(evidenciaIncidente)
            .eq('id_evidencia', id)
            .single();
        if (error) {
            return null;
        }
        return data as EvidenciaIncidente;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('evidencias_incidente')
            .delete()
            .eq('id_evidencia', id);
        return !error;
    }
}
