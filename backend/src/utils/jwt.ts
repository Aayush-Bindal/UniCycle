import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // put in .env
const EXPIRES_IN = "7d"; // session length

export const createJWT = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
    