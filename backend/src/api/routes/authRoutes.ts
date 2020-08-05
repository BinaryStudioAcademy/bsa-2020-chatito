import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { register } from '../../services/authService';

const router = Router();

router
  .post('/register', run((req: Request) => register(req.body.user)));

export default router;
