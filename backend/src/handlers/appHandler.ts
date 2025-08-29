import { Router } from "express";
import z from "zod";

const appHandler = Router();

const courseStep1Type = z.object({
  title: z.string(),
  description: z.string(),
  catergory: z.string(),
  thumbnail: z.string(),
});

//login handler
appHandler.get("/course-1", (req, res) => {
  res.send("profile");
});
appHandler.get("/course-2", (req, res) => {
  res.send("profile");
});
appHandler.get("/course-2", (req, res) => {
  res.send("profile");
});

export { appHandler };
