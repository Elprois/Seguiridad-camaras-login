export interface Usuario {
    id_usuario: number;
    id_rol: number;
    username: string;
    password_hash: string;
    nombre: string;
    apellido: string;
    estado: string;
}
