import { Usuario } from '../../../domain/usuario/usuario';
import { UsuarioRepository } from '../../ports/usuario/usuario.repository';

export class UpdateUsuario {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async execute(id: number, usuario: Partial<Usuario>): Promise<Usuario | null> {
        return this.usuarioRepository.update(id, usuario);
    }
}
