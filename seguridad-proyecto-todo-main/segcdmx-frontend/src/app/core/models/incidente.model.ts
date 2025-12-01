export type EstadoIncidente =
  | 'Pendiente'
  | 'Validado'
  | 'Resuelto'
  | 'Falsa Alarma';

export interface Incidente {
  id: string;
  fechaHora: string;
  tipo: string;
  descripcion: string;
  estado: EstadoIncidente;
  zona: string;
  guardia?: string;
}

