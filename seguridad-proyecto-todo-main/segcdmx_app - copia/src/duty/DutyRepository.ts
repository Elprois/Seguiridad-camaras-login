import { api } from '../services/api';

export async function performCheckIn(turnoId: number, userId: number) {
  return api.post('registros-asistencia/check-in', { id_turno: turnoId, id_usuario: userId });
}

export async function getActiveCheckIn(userId: number) {
  try {
    const response = await api.get(`registros-asistencia/activo/usuario/${userId}`);
    console.log('getActiveCheckIn response:', response);
    return response;
  } catch (error) {
    console.error('Error in getActiveCheckIn:', error);
    throw error;
  }
}

export async function performCheckOut(registroId: number) {
  return api.put(`registros-asistencia/check-out/${registroId}`, {});
}

export async function getAvailableShifts(userId: number) {
  try {
    const response = await api.get(`turnos/usuario/${userId}`);
    console.log('getAvailableShifts response:', response);
    return response;
  } catch (error) {
    console.error('Error in getAvailableShifts:', error);
    throw error;
  }
}
