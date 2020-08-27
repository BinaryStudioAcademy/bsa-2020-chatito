import { Router, Request } from 'express';
import { signS3 } from '../../services/awsService';
import { run } from '../../common/utils/routeHelper';

const router = Router();

router
  .post('/sign-s3', run((req: Request) => signS3(req.body.fileType)));

export default router;
