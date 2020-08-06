import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { login, register } from '../../services/authService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

const router = Router();

router
  .post('/login', authenticationMiddleware, (req, res, next) => login(req.user)
    .then(data => res.send(data))
    .catch(next))
  .post('/register', run((req: Request) => register(req.body.user)));

export default router;
