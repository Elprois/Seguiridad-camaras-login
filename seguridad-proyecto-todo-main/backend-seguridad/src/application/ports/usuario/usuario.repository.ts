import { Usuario } from '../../../domain/usuario/usuario';

export interface UsuarioRepository {
    create(usuario: Omit<Usuario, 'id_usuario'>): Promise<boolean>;
    findByUsername(username: string): Promise<Usuario | null>;
    findById(id: number): Promise<Usuario | null>;
    findAll(): Promise<Usuario[]>;
    update(id: number, usuario: Partial<Usuario>): Promise<Usuario | null>;
    delete(id: number): Promise<boolean>;
}
