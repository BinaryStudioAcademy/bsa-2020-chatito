/* eslint-disable */
import { IAuthUser } from "../../models/user/IAuthUser";

declare global {
  namespace Express {
    interface User extends IAuthUser {}

    interface Request {
      user?: User;
      id?: string;
    }
  }
}
