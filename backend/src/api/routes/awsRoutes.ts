import { Router, Request } from 'express';
import { signS3, deleteObject } from '../../services/awsService';
import { run } from '../../common/utils/routeHelper';

const router = Router();

router
  .post('/sign-s3', run((req: Request) => signS3(req.user.id, req.body.folder, req.body.fileType)))
  .delete('/delete', run((req: Request) => deleteObject(req.body.url)));

export default router;
