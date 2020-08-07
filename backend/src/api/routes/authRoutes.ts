import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { register, login } from '../../services/authService';

const router = Router();

router
  .post('/login', run((req: Request) => login(req.body)))
  .post('/register', run((req: Request) => register(req.body.user)));

export default router;
