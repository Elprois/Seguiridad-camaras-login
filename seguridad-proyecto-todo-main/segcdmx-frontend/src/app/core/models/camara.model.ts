export interface Camara {
  id: string;
  nombre: string;
  ubicacion: string;
  urlImagen: string;
  tieneAlerta: boolean;
  estado: 'Operativa' | 'Sin señal' | 'Mantenimiento';
  ipConfigurada?: string;
}
