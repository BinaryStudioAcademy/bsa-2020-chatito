/* eslint-disable */
import { Server } from "socket.io";
import { IUser } from "../../models/user/IUser";
declare global {
  namespace Express {
    interface User extends IUser { }

    interface Request {
      user?: User;
      id?: string;
      io: Server;
    }
  }
}
