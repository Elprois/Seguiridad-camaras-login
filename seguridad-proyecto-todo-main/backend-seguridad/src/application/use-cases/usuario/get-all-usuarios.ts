import { Usuario } from '../../../domain/usuario/usuario';
import { UsuarioRepository } from '../../ports/usuario/usuario.repository';

export class GetAllUsuarios {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async execute(): Promise<Usuario[]> {
        return this.usuarioRepository.findAll();
    }
}
