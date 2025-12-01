import { Request, Response } from 'express';
import { CreateUsuario } from '../../../application/use-cases/usuario/create-usuario';
import { GetUsuario } from '../../../application/use-cases/usuario/get-usuario';
import { GetAllUsuarios } from '../../../application/use-cases/usuario/get-all-usuarios';
import { UpdateUsuario } from '../../../application/use-cases/usuario/update-usuario';
import { DeleteUsuario } from '../../../application/use-cases/usuario/delete-usuario';
import { Usuario } from '../../../domain/usuario/usuario';

export class UsuarioController {
    constructor(
        private readonly createUsuario: CreateUsuario,
        private readonly getUsuario: GetUsuario,
        private readonly getAllUsuarios: GetAllUsuarios,
        private readonly updateUsuario: UpdateUsuario,
        private readonly deleteUsuario: DeleteUsuario
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { username, password, nombre, apellido, id_rol, estado } = req.body;
            const success = await this.createUsuario.execute(username, password, nombre, apellido, id_rol, estado);
            if (success) {
                res.status(201).json({ message: 'Usuario created successfully' });
            } else {
                res.status(400).json({ message: 'Could not create usuario' });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Error creating usuario', error: error.message });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const usuario = await this.getUsuario.execute(+req.params.id);
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ message: 'Usuario not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding usuario' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await this.getAllUsuarios.execute();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Error finding usuarios' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const usuario = await this.updateUsuario.execute(+req.params.id, req.body as Partial<Usuario>);
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ message: 'Usuario not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating usuario' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteUsuario.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Usuario not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting usuario' });
        }
    }
}
