import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Usuario } from '../../../domain/usuario/usuario';
import { UsuarioRepository } from '../../ports/usuario/usuario.repository';

export class LoginUser {
    constructor(private readonly usuarioRepository: UsuarioRepository) { }

    async execute(username: string, password: string): Promise<string | null> {
        const user = await this.usuarioRepository.findByUsername(username);

        if (!user) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return null;
        }

        // VERIFICACIÓN DE ROL: Solo permitimos acceso a Administradores (id_rol === 1)
        // TODO: Mover el ID de rol a una configuración o constante
        console.log(`[Login Debug] User found: ${user.username}, Role ID: ${user.id_rol}`);

        if (user.id_rol !== 1) {
            console.error(`[Login Debug] Access denied for user ${user.username}. Expected Role ID 1, got ${user.id_rol}`);
            throw new Error('Acceso no autorizado: Se requiere rol de Administrador');
        }

        const token = jwt.sign(
            {
                id: user.id_usuario,
                username: user.username,
                role: 'admin' // Incluimos el rol explícitamente en el token
            },
            'your-secret-key',
            {
                expiresIn: '1h',
            }
        );

        return token;
    }
}
