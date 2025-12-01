import { Usuario } from '../../../domain/usuario/usuario';
import { UsuarioRepository } from '../../ports/usuario/usuario.repository';

export class GetUsuario {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async execute(id: number): Promise<Usuario | null> {
        return this.usuarioRepository.findById(id);
    }
}
