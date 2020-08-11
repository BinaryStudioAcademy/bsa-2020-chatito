import { Request, Response, NextFunction } from 'express';
import { jwtHeaderMiddleware } from './jwtMiddleware';

export default (routesWhiteList: string[] = []) => (
  (req: Request, res: Response, next: NextFunction) => (
    routesWhiteList.some(route => route === req.path)
      ? next()
      : jwtHeaderMiddleware(req, res, next)
  )
);
