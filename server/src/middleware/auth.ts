import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw Object.assign(
      new Error("Token is missing or invalid"),
      { statusCode: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw Object.assign(
      new Error("Token is missing or invalid"),
      { statusCode: 401 }
    );
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      _id: string;
    };

    req.user = payload;
    next();
  } catch {
    throw Object.assign(
      new Error("Token is missing or invalid"),
      { statusCode: 401 }
    );
  }
};