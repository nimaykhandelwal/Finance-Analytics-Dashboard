import { Router } from 'express';
import { register, login } from '../controllers/authController';
const r = Router();
r.post('/register', register);
r.post('/login', login);
export default r;
