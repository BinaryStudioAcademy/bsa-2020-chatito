import { Router, Request } from 'express';
import { signS3, deleteAvatar } from '../../services/awsService';
import { run } from '../../common/utils/routeHelper';

const router = Router();

router
  .post('/sign-s3', run((req: Request) => signS3(req.user.id)))
  .delete('/delete-avatar', run((req: Request) => deleteAvatar(req.body.imageUrl)));

export default router;
