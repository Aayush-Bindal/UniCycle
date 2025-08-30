import { NextFunction, Request, Response } from "express";

import passport from '@src/middlewares/passportStrategy';

export default function Authorise(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  passport.authenticate("jwt", { session: false })(req, res, next);
}
