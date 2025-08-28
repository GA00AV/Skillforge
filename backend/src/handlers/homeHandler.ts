import { Router } from "express";
import { AuthRequest } from "../middlewares.js";

const homeHandler = Router();
homeHandler.get("/user", (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

export { homeHandler };
