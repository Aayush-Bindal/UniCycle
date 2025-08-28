import { Request, Response } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "somerandomsecrentusingwhichthedatacan";

passport.use(
  new Strategy(opts, (payload, done) => {
    console.log(payload);
    done(null, false);
  }),
);

export default function Authorise(req: Request, res: Response, next: any) {
  let cookie = req.cookies;
  console.log(cookie);
  next();
}
