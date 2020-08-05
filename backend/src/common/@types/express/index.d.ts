/* eslint-disable */
import { IAuthUser } from "../../models/user/IAuthUser";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthUser;
      id?: string;
    }
  }
}
