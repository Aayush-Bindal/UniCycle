import { NextFunction, Request, Response } from "express";
<<<<<<< Updated upstream
import passport from "./passportStrategy.js";
=======
import passport from '@src/services/passportStrategy';
>>>>>>> Stashed changes

export default function Authorise(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  passport.authenticate("jwt", { session: false })(req, res, next);
}
