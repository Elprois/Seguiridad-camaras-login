import { supabase } from '../services/supabase';

export async function fetchEquipment(id_usuario: number) {
  const { data, error } = await supabase
    .from('Equipo_Asignado')
    .select(`
      id_asignacion,
      estado,
      Equipo_Catalogo (id_equipo, nombre_equipo, modelo)
    `)
    .eq('id_usuario', id_usuario);
  
  if (error) {
    console.error('Error fetching equipment:', error);
    throw new Error('No se pudo obtener el equipo asignado.');
  }
  
  return data;
}

export async function updateEquipmentStatus(id: number, newStatus: string) {
    const { error } = await supabase
      .from('Equipo_Asignado')
      .update({ estado: newStatus })
      .eq('id_asignacion', id);
      
    if (error) {
      console.error('Error updating equipment status:', error);
      throw new Error('No se pudo actualizar el estado del equipo.');
    }
}

export async function fetchEquipmentCatalog() {
  const { data, error } = await supabase
    .from('Equipo_Catalogo')
    .select('*');
  
  if (error) {
    console.error('Error fetching equipment catalog:', error);
    throw new Error('No se pudo obtener el catálogo de equipo.');
  }
  
  return data;
}

export async function saveEquipmentSelection(id_usuario: number, selectedEquipmentIds: number[]) {
  const { error: deleteError } = await supabase
    .from('Equipo_Asignado')
    .delete()
    .eq('id_usuario', id_usuario);

  if (deleteError) {
    console.error('Error deleting existing equipment:', deleteError);
    throw new Error('No se pudo actualizar la selección de equipo.');
  }

  if (selectedEquipmentIds.length === 0) {
    return;
  }

  const newEquipment = selectedEquipmentIds.map(id_equipo => ({
    id_usuario,
    id_equipo,
    estado: 'Operativo',
    fecha_asignacion: new Date().toISOString(),
  }));

  const { error: insertError } = await supabase
    .from('Equipo_Asignado')
    .insert(newEquipment);

  if (insertError) {
    console.error('Error inserting new equipment:', insertError);
    throw new Error('No se pudo guardar la selección de equipo.');
  }
}
