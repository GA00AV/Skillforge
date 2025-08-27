import { Router } from "express";

const appHandler = Router();

//login handler
appHandler.get("/profile", (req, res) => {
  res.send("profile");
});

export { appHandler };
