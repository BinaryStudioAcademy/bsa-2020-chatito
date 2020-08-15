import jwtAuth from 'socketio-jwt-auth';
import { getCustomRepository } from 'typeorm';
import { secret } from '../../config/jwtConfig';
import UserRepository from '../../data/repositories/userRepository';

export default jwtAuth.authenticate({
  secret
}, async (payload, done) => {
  try {
    const { id } = payload;
    const user = await getCustomRepository(UserRepository).getById(id);
    return user ? done(null, user) : done(new Error('Token is invalid.'), null);
  } catch (err) {
    return done(err);
  }
  done();
});

