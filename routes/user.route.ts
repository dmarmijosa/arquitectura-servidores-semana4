import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/user.controller';

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/', registerUser);

// Ruta para login de usuario
router.post('/login', loginUser);

export default router;
