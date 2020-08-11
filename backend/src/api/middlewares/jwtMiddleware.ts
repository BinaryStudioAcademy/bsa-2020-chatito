import passport from 'passport';

export const jwtHeaderMiddleware = passport.authenticate('jwt-header', { session: false });

export const jwtBodyMiddleware = passport.authenticate('jwt-body', { session: false });
