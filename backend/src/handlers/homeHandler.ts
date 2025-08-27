import { Router } from "express";

const homeHandler = Router();
homeHandler.get("/", (req, res) => {
  res.send("home");
});
export { homeHandler };
