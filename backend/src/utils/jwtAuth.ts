import jwt from "jsonwebtoken";

const JWT_SECRET = "gbtw4hukfvhjksbfcjvkwbjq32knravewdqnlJEKCHVBFEIDNJFKV";

interface User {
  id: number;
  email: string;
}

interface JWTPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

// create function
export const createJWT = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// verify function
export const verifyJWT = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};