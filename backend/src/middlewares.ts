import { NextFunction, Request, Response } from "express";
import { redis } from "./lib/redis.js";

export interface AuthRequest extends Request {
  user?: any;
  cookies: any;
}

export async function authorisationMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const session = req.cookies["session_id"];
  if (!session) {
    return next();
  }
  let info = await redis.get(session);
  if (!info) {
    return next();
  }

  req.user = JSON.parse(info);
  return next();
}

export async function loggedInMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.sendStatus(401);
  }
  next();
}
export async function loggedOutMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    return res.sendStatus(422);
  }
  next();
}
