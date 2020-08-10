import { Router, Request, Response } from 'express';
import { run } from '../../common/utils/routeHelper';
import { getUsers, getUserById, deleteUser, editProfile } from '../../services/userService';

const router = Router();

router
  .get('/', run(getUsers))
  .get('/:id', run((req: Request) => getUserById(req.params.id)))
  .get('/me', run((req: Request) => getUserById(req.user.id)))
  .delete('/', run((req: Request) => deleteUser(req.user.id)))
  .put('/', run((req: Request) => editProfile(req.body)));

export default router;
