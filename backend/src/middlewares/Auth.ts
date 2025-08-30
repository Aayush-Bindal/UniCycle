import { NextFunction, Request, Response } from "express";
import passport from "../funcs/passportStrategy.ts";

export default function Authorise(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  passport.authenticate("jwt", { session: false })(req, res, next);
}
