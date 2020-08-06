import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { compare } from '../../common/utils/encryptHelper';
import UserRepository from '../../data/repositories/userRepository';

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body.user;
    const mailText = email.toLowerCase();
    const users = await getCustomRepository(UserRepository).getAll();
    for (let i = 0; i < users.length; i += 1) {
      const logg = await compare(password, users[i].password);
      if (logg && users[i].email.toLowerCase() === mailText) {
        req.body.user.id = users[i].id;
        break;
      }
    }
    res.sendDate = true;
    next();
  } catch (error) {
    req.body.user = {};
    next();
  }
};

export default authenticationMiddleware;
