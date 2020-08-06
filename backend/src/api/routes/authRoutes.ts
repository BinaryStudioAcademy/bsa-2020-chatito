import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { register, login } from '../../services/authService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

const router = Router();

router
  .post('/login', authenticationMiddleware, run((req: Request) => login(req.user)))
  .post('/register', run((req: Request) => register(req.body.user)));

export default router;
