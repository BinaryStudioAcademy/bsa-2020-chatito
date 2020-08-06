import { Router, Request } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getUsers, getUserById, deleteUserById } from '../../services/userService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)))
  .delete('/:id', run((req: Request) => deleteUserById(req.params.id)));

export default router;
