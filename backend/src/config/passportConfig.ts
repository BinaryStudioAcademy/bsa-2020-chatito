import passport from 'passport';
import { getCustomRepository } from 'typeorm';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { secret } from './jwtConfig';
import { IAuthUser } from '../common/models/user/IAuthUser';
import UserRepository from '../data/repositories/userRepository';

const validateUser = async (id: string, done: VerifiedCallback) => {
  try {
    const user = await getCustomRepository(UserRepository).getById(id);
    return user ? done(null, user) : done({ status: 401, message: 'Token is invalid.' }, null);
  } catch (err) {
    return done(err);
  }
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use('jwt-header', new JwtStrategy(options, async ({ id }: IAuthUser, done) => (
  validateUser(id, done)
)));

const options2 = {
  jwtFromRequest: ExtractJwt.fromBodyField('token'),
  secretOrKey: secret
};

passport.use('jwt-body', new JwtStrategy(options2, async ({ id }: IAuthUser, done) => (
  validateUser(id, done)
)));
