import { Router } from 'express';
import { AuthController } from './auth.controller';

export const authRouter = (controller: AuthController) => {
    const router = Router();

    router.post('/login', (req, res) => controller.login(req, res));

    return router;
};
