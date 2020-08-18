import passport from 'passport';

export default passport.authenticate('facebook-token', { session: false });
