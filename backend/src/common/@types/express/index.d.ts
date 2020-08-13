/* eslint-disable */
import { IAuthUser } from "../../models/user/IAuthUser";
import { Server } from "socket.io";

declare global {
  namespace Express {
    interface User extends IAuthUser { }

    interface Request {
      user?: User;
      id?: string;
      io: Server;
    }
  }
}
