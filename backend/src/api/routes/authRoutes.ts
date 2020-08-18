import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import {
  register,
  refreshTokens,
  login, forgotPassword,
  resetPassword,
  removeToken,
  loginWithGoogle,
  loginWithFacebook
} from '../../services/authService';
import { getUserById } from '../../services/userService';
import { jwtBodyMiddleware } from '../middlewares/jwtMiddleware';
import facebookAuthMiddleware from '../middlewares/facebookAuthMiddleware';

const router = Router();

router
  .get('/me', run((req: Request) => getUserById(req.user.id)))
  .post('/register', run((req: Request) => register(req.body.user)))
  .post('/login', run((req: Request) => login(req.body)))
  .post('/login/google', run((req: Request) => loginWithGoogle(req.body)))
  .post('/login/facebook', facebookAuthMiddleware, run((req: Request) => loginWithFacebook(req.user, req.body)))
  .post('/tokens', run((req: Request) => refreshTokens(req.body.refreshToken)))
  .put('/forgotpass', run((req: Request) => forgotPassword(req.body)))
  .put('/resetpass', jwtBodyMiddleware, run((req: Request) => resetPassword(req.user.id, req.body.password)))
  .delete('/tokens', run((req: Request) => removeToken(req.body.token)));

export default router;
