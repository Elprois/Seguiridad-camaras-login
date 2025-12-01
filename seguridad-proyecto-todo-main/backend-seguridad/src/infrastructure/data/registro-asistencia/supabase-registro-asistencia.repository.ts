import { RegistroAsistencia } from '../../../domain/registro-asistencia/registro-asistencia';
import { RegistroAsistenciaRepository, RegistroAsistenciaEstado } from '../../../application/ports/registro-asistencia/registro-asistencia.repository';
import { supabase } from '../supabase';

export class SupabaseRegistroAsistenciaRepository implements RegistroAsistenciaRepository {
    async create(registroAsistencia: RegistroAsistencia): Promise<RegistroAsistencia | null> {
        const { data, error } = await supabase
            .from('registros_asistencia')
            .insert([registroAsistencia])
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findById(id: number): Promise<RegistroAsistencia | null> {
        const { data, error } = await supabase
            .from('registros_asistencia')
            .select('*')
            .eq('id_registro', id)
            .single();
        if (error) {
            return null;
        }
        return data as RegistroAsistencia;
    }

    async findActiveByUsuarioId(id_usuario: number): Promise<RegistroAsistencia | null> {
        const { data, error } = await supabase
            .from('registros_asistencia')
            .select('*')
            .eq('id_usuario', id_usuario)
            .is('check_out_time', null)
            .single();
        if (error) {
            return null;
        }
        return data as RegistroAsistencia;
    }

    async findAll(): Promise<RegistroAsistencia[]> {
        const { data, error } = await supabase
            .from('registros_asistencia')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data as RegistroAsistencia[];
    }

    async getEstadoPorUsuario(): Promise<RegistroAsistenciaEstado[]> {
        const { data: users, error: usersError } = await supabase
            .from('usuarios')
            .select('id_usuario, nombre, apellido');

        if (usersError) {
            throw new Error(usersError.message);
        }

        const resultados: RegistroAsistenciaEstado[] = [];
        const now = new Date();

        for (const user of users) {
            // Check for active check-in
            const { data: activeCheckIn, error: activeCheckInError } = await supabase
                .from('registros_asistencia')
                .select('*')
                .eq('id_usuario', user.id_usuario)
                .is('check_out_time', null)
                .single();

            if (activeCheckInError && activeCheckInError.code !== 'PGRST116') { // PGRST116 = no rows found
                console.error('Error fetching active check-in:', activeCheckInError);
                continue;
            }

            if (activeCheckIn) {
                resultados.push({
                    id_usuario: user.id_usuario,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    estado_turno: 'CHECK-IN',
                    hora: new Date(activeCheckIn.check_in_time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                });
                continue;
            }

            // If no active check-in, check for next pending shift
            const { data: nextShift, error: nextShiftError } = await supabase
                .from('turnos')
                .select('fecha_hora_inicio')
                .eq('id_usuario', user.id_usuario)
                .eq('estado', 'Asignado')
                .gte('fecha_hora_inicio', now.toISOString())
                .order('fecha_hora_inicio', { ascending: true })
                .limit(1)
                .single();

            if (nextShiftError && nextShiftError.code !== 'PGRST116') { // PGRST116 = no rows found
                console.error('Error fetching next shift:', nextShiftError);
                continue;
            }

            if (nextShift) {
                resultados.push({
                    id_usuario: user.id_usuario,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    estado_turno: 'PENDIENTE',
                    hora: `Turno inicia ${new Date(nextShift.fecha_hora_inicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`,
                });
                continue;
            }

            // If no active check-in and no pending shift, check last check-out
            const { data: lastCheckOut, error: lastCheckOutError } = await supabase
                .from('registros_asistencia')
                .select('check_out_time')
                .eq('id_usuario', user.id_usuario)
                .not('check_out_time', 'is', null)
                .order('check_out_time', { ascending: false })
                .limit(1)
                .single();

            if (lastCheckOutError && lastCheckOutError.code !== 'PGRST116') { // PGRST116 = no rows found
                console.error('Error fetching last check-out:', lastCheckOutError);
                continue;
            }

            if (lastCheckOut) {
                resultados.push({
                    id_usuario: user.id_usuario,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    estado_turno: 'CHECK-OUT',
                    hora: new Date(lastCheckOut.check_out_time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                });
                continue;
            }

            // If none of the above, consider as no status
            resultados.push({
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                estado_turno: 'PENDIENTE', // Default to PENDIENTE if no specific status
                hora: 'Sin turno asignado',
            });
        }

        return resultados;
    }

    async update(id: number, registroAsistencia: Partial<RegistroAsistencia>): Promise<RegistroAsistencia | null> {
        const { data, error } = await supabase
            .from('registros_asistencia')
            .update(registroAsistencia)
            .eq('id_registro', id)
            .select()
            .single();
        if (error) {
            return null;
        }
        return data;
    }

    async delete(id: number): Promise<boolean> {
        const { error } = await supabase
            .from('registros_asistencia')
            .delete()
            .eq('id_registro', id);
        return !error;
    }
}
