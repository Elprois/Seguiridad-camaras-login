import { supabase } from '../services/supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

// 1. Fetch Incident Types
export async function fetchIncidentTypes() {
  const { data, error } = await supabase.from('Tipos_Incidente').select('id_tipo_incidente, nombre_tipo');

  if (error) {
    console.error('Error fetching incident types:', error);
    throw new Error('No se pudieron obtener los tipos de incidente.');
  }

  return data;
}

const getContentType = (uri: string) => {
  const fileExt = uri.split('.').pop()?.toLowerCase();
  if (fileExt === 'jpg' || fileExt === 'jpeg') {
    return 'image/jpeg';
  }
  if (fileExt === 'png') {
    return 'image/png';
  }
  if (fileExt === 'mp4') {
    return 'video/mp4';
  }
  return 'application/octet-stream'; // default
}

export async function uploadImage(uri: string, incidentId: string): Promise<string> {
  try {
    const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpeg';
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${incidentId}/${fileName}`;
    
    // Create a FormData object
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: fileName,
      type: getContentType(uri),
    } as any);

    const { data, error: uploadError } = await supabase.storage
      .from('evidencias')
      .upload(filePath, formData);

    if (uploadError) {
      throw new Error(`Error de Supabase: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('evidencias')
      .getPublicUrl(filePath);

    if (!publicUrlData?.publicUrl) {
      throw new Error('No se pudo obtener la URL pública del archivo.');
    }

    return publicUrlData.publicUrl;
  } catch (e) {
    console.error('Error in uploadImage:', e);
    if (e instanceof Error) {
      throw e;
    }
    throw new Error('Ocurrió un error inesperado al subir la imagen.');
  }
}

const getFileType = (uri: string): 'Imagen' | 'Video' => {
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
  const fileExt = uri.split('.').pop()?.toLowerCase();
  return fileExt && videoExtensions.includes(fileExt) ? 'Video' : 'Imagen';
};


export async function createIncident({
  typeId,
  description,
  lat,
  long,
  mediaFiles,
  id_usuario,
  prioridad,
}: {
  typeId: number;
  description: string;
  lat: number;
  long: number;
  mediaFiles: string[];
  id_usuario: number;
  prioridad: string;
}) {
  // 1. Insert the incident and get the newly created row
  const { data: incidentData, error: incidentError } = await supabase
    .from('Incidentes')
    .insert({
      id_tipo_incidente: typeId,
      descripcion: description,
      latitud: lat,
      longitud: long,
      id_usuario_reporta: id_usuario,
      fecha_hora_reporte: new Date().toISOString(),
      prioridad: prioridad,
    })
    .select('id_incidente')
    .single();

  if (incidentError) {
    console.error('Error creating incident:', incidentError);
    throw new Error(`Error en la base de datos: ${incidentError.message}`);
  }

  if (!incidentData || !incidentData.id_incidente) {
    console.error('Failed to create incident, no data returned.');
    throw new Error('No se pudo crear el incidente, el servidor no devolvió datos.');
  }

  const newIncidentId = incidentData.id_incidente;

  // 2. Upload media files and insert into evidence table
  if (mediaFiles && mediaFiles.length > 0) {
    for (const fileUri of mediaFiles) {
      try {
        const publicUrl = await uploadImage(fileUri, newIncidentId.toString());
        const fileType = getFileType(fileUri);

        const { error: evidenceError } = await supabase
          .from('Evidencias_Incidente')
          .insert({
            id_incidente: newIncidentId,
            url_archivo: publicUrl,
            tipo_archivo: fileType,
          });

        if (evidenceError) {
          console.error('Error inserting evidence:', evidenceError);
          throw new Error(`Error al guardar evidencia: ${evidenceError.message}`);
        }
      } catch (uploadError) {
        console.error(`Failed to upload ${fileUri}:`, uploadError);
        // Re-throw the error to be caught by the handleSubmit's catch block
        throw uploadError;
      }
    }
  }

  // 3. Update the incident status to 'Sincronizado'
  const { error: updateError } = await supabase
    .from('Incidentes')
    .update({ estado_sincronizacion: 'Sincronizado' })
    .eq('id_incidente', newIncidentId);

  if (updateError) {
    console.error('Error updating incident status:', updateError);
    // This is not a critical error for the user, but good to know for debugging.
    // We don't throw here so the user sees a success message.
  }

  return { id: newIncidentId };
}

export async function fetchRecentIncidents() {
  const { data, error } = await supabase
    .from('Incidentes')
    .select(`
      id_incidente,
      descripcion,
      fecha_hora_reporte,
      estado_sincronizacion,
      prioridad,
      Tipos_Incidente (nombre_tipo),
      Usuarios (nombre, apellido)
    `)
    .order('fecha_hora_reporte', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching incident history:', error);
    throw new Error(error.message || 'No se pudo obtener el historial de incidentes.');
  }

  return data;
}

export async function fetchIncidentDetails(incidentId: number) {
  const { data, error } = await supabase
    .from('Incidentes')
    .select(`
      *,
      Tipos_Incidente (nombre_tipo),
      Usuarios (nombre, apellido),
      Evidencias_Incidente (id_evidencia, url_archivo, tipo_archivo)
    `)
    .eq('id_incidente', incidentId)
    .single();

  if (error) {
    console.error(`Error fetching details for incident ${incidentId}:`, error);
    throw new Error('No se pudieron obtener los detalles del incidente.');
  }

  return data;
}
