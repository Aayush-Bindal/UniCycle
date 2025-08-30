import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

const some_demo_loginss = {
  userid: 1,
  email: 'abcd@abcd.com',
  password: 'abed',
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'btw4hukfvhjksbfcjvkwbjq32knravewdqnlJEKCHVBFEIDNJFKV',
};

passport.use(
  new Strategy(opts, (payload, done) => {
    console.log(payload);
    if (payload.uid == 1) {
      console.log("user accepted");
      return done(null, some_demo_loginss);
    } else {
      console.log("user rejected", payload.uid);
      return done(null, false);
    }
  }),
);

export default passport;