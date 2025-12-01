import { Request, Response } from 'express';
import { LoginUser } from '../../../application/use-cases/auth/login-user';

export class AuthController {
    constructor(private readonly loginUser: LoginUser) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const token = await this.loginUser.execute(username, password);

            if (token) {
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    }
}
