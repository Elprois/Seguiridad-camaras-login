import { UsuarioRepository } from '../../ports/usuario/usuario.repository';

export class DeleteUsuario {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.usuarioRepository.delete(id);
    }
}
