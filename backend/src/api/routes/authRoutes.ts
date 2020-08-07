import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { register, refreshTokens } from '../../services/authService';

const router = Router();

router
  .post('/register', run((req: Request) => register(req.body.user)))
  .post('/tokens', run((req: Request) => refreshTokens(req.body.refreshToken)));

export default router;
