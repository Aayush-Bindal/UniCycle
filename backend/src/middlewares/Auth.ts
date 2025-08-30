import { NextFunction, Request, Response } from "express";
import passport from "./passportStrategy.js";

export default function Authorise(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  passport.authenticate("jwt", { session: false })(req, res, next);
}
