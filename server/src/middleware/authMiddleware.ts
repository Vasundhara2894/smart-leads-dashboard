import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { id: string; role: string };

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Access denied");
    }
    next();
  };
};