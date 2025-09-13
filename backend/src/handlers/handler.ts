import { Router } from "express";
import { redis } from "../lib/redis.js";
import { userLoginType, userSignupType } from "../types/types.js";
import { prisma } from "../lib/prisma.js";
import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";
import { AuthRequest } from "../middlewares.js";
import CourseService from "../graphql/services/Course.js";

const handler = Router();

//login handler
handler.post("/signup", async (req, res) => {
  try {
    const expirationTime =
      Number(process.env.MAX_SESSION_TIME_IN_SEC) || 30 * 60;
    let result = userSignupType.safeParse(req.body);
    if (!result.success) {
      let errors: Record<string, string> = {};
      result.error.issues.map((issue) => {
        errors[issue.path.join(".")] = issue.message;
      });
      res.status(400);
      return res.json({ errors });
    }

    if (result.data.confirmPassword !== result.data.password) {
      res.status(400);
      return res.json({
        errors: { confirmPassword: "Passwords don't match!" },
      });
    }
    // check if user already exist
    let data = await prisma.user.findUnique({
      where: { email: result.data.email },
    });
    if (data) {
      res.status(400);
      return res.json({
        errors: { email: "email already exists!" },
      });
    }
    // hash password and create user if not exist
    result.data.password = await hash(result.data.password, 10);
    data = await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: result.data.password,
      },
    });
    // create session for user and store in redis
    let session = randomUUID();
    let userInfo = JSON.stringify({
      name: data.name,
      email: data.email,
      profileImg: data.profileImg,
      id: data.id,
    });
    redis.set(session, userInfo, {
      expiration: { type: "EX", value: expirationTime },
    });
    // return success and session
    res.cookie("session_id", session, { maxAge: 1000 * expirationTime });
    res.status(200);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// signup handler
handler.post("/login", async (req, res) => {
  try {
    const expirationTime =
      Number(process.env.MAX_SESSION_TIME_IN_SEC) || 30 * 60;
    let result = userLoginType.safeParse(req.body);
    if (!result.success) {
      let errors: Record<string, string> = {};
      result.error.issues.map((issue) => {
        errors[issue.path.join(".")] = issue.message;
      });
      res.status(400);
      return res.json({ errors });
    }
    // validate user credentials
    let data = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    if (!data) {
      res.status(400);
      return res.json({
        errors: { email: "email doesn't exists!" },
      });
    }
    let isPasswordCorrect = await compare(result.data.password, data?.password);
    if (!isPasswordCorrect) {
      res.status(400);
      return res.json({
        errors: { password: "password is incorrect" },
      });
    }

    // create session for user and store in redis
    let session = randomUUID();
    let userInfo = JSON.stringify({
      name: data.name,
      email: data.email,
      profileImg: data.profileImg,
      id: data.id,
    });
    redis.set(session, userInfo, {
      expiration: { type: "EX", value: expirationTime },
    });
    // return success and session
    res.cookie("session_id", session, { maxAge: 1000 * expirationTime });
    res.status(200);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//signout handler
handler.post("/signout", async (req: AuthRequest, res) => {
  try {
    const session = req.cookies["session_id"];
    let data = await redis.del(session);
    if (!data) {
      return res.sendStatus(422);
    }
    res.clearCookie("session_id");
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

handler.get("/user", (req: AuthRequest, res) => {
  res.json({ user: req.user });
});
handler.post("/isEnrolled", async (req, res) => {
  if (req.body.courseID && req.body.studentID) {
    return res.json({
      success: await CourseService.isEnrolled(
        req.body.courseID,
        req.body.studentID
      ),
    });
  }
  return res.sendStatus(402);
});
export { handler };
