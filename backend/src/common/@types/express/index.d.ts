/* eslint-disable */
import { IAuthUser } from "../../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthUser;
      id?: string;
    }
  }
}
