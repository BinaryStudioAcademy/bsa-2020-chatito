import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getUsers, getUserById } from '../../services/userService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)))
  .get('/me', run((req: Request) => getUserById(req.user.id)));

export default router;
