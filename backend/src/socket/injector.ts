import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';

export default (io: Server) => (req: Request, _res: Response, next: NextFunction) => {
  req.io = io;
  next();
};
