import passport from 'passport';
import { getCustomRepository } from 'typeorm';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { secret } from './jwtConfig';
import { IAuthUser } from '../common/models/user/IAuthUser';
import UserRepository from '../data/repositories/userRepository';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(new JwtStrategy(options, async ({ id }: IAuthUser, done) => {
  try {
    const user = await getCustomRepository(UserRepository).getById(id);
    return user ? done(null, user) : done({ status: 401, message: 'Token is invalid.' }, null);
  } catch (err) {
    return done(err);
  }
}));
