import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { register, refreshTokens, login, forgotPassword, resetPassword } from '../../services/authService';
import { getUserById } from '../../services/userService';

const router = Router();

router
  .get('/me', run((req: Request) => getUserById(req.user.id)))
  .post('/register', run((req: Request) => register(req.body.user)))
  .post('/login', run((req: Request) => login(req.body)))
  .post('/tokens', run((req: Request) => refreshTokens(req.body.refreshToken)))
  .put('/forgotpass', run((req: Request) => forgotPassword(req.body)))
  .put('/resetpass', run((req: Request) => resetPassword({ id: req.user.id, password: req.body })));

export default router;
