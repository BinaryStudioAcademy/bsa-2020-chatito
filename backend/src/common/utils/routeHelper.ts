import { Request, Response, NextFunction } from 'express';

export const run = <T>(method: (req?: Request) => Promise<T>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  method(req).then(result => res.send(result)).catch(next);
};
