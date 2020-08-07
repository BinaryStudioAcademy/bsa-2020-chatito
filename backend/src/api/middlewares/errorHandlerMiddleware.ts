import { Request, Response, NextFunction } from 'express';
import CustomError from '../../common/models/CustomError';

export default (err: CustomError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  }
  res.status(err.status || 500).send(err);
};
