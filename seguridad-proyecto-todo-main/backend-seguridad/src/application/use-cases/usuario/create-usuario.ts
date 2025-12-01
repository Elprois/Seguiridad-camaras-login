import * as bcrypt from 'bcrypt';
import { Usuario } from '../../../domain/usuario/usuario';
import { UsuarioRepository } from '../../ports/usuario/usuario.repository';

export class CreateUsuario {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async execute(username: string, password: string, nombre: string, apellido: string, id_rol: number, estado: string): Promise<boolean> {
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        const success = await this.usuarioRepository.create({
            username,
            password_hash,
            nombre,
            apellido,
            id_rol,
            estado,
        });

        return success;
    }
}
