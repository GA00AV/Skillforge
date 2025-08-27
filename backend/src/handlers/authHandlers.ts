import { Router } from "express";
import { redis } from "../lib/redis.js";
import { userLoginType, userSignupType } from "../types/types.js";
import { prisma } from "../lib/prisma.js";
import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";

const authHandler = Router();

//login handler
authHandler.post("/signup", async (req, res) => {
  try {
    const expirationTime =
      Number(process.env.MAX_SESSION_TIME_IN_SEC) || 30 * 60;
    let result = userSignupType.safeParse(req.body);
    if (!result.success) {
      let errors: Record<string, string> = {};
      result.error.issues.map((issue) => {
        errors[issue.path.join(".")] = issue.message;
      });
      res.status(422);
      return res.json({ errors });
    }
    // check if user already exist
    let data = await prisma.user.findUnique({
      where: { email: result.data.email },
    });
    if (data) {
      res.status(422);
      return res.json({
        errors: { email: "email already exists!" },
      });
    }
    // hash password and create user if not exist
    result.data.password = await hash(result.data.password, 10);
    data = await prisma.user.create({ data: result.data });
    // create session for user and store in redis
    let session = randomUUID();
    let userInfo = JSON.stringify({
      name: data.name,
      email: data.email,
      profileImg: data.profileImg,
    });
    redis.set(session, userInfo, {
      expiration: { type: "EX", value: expirationTime },
    });
    // return success and session
    res.cookie("session_id", session, { maxAge: 1000 * expirationTime });
    res.json({ success: true });
  } catch {
    res.status(500);
    res.json({ serverError: true });
  }
});

// signup handler
authHandler.post("/login", async (req, res) => {
  try {
    const expirationTime =
      Number(process.env.MAX_SESSION_TIME_IN_SEC) || 30 * 60;
    let result = userLoginType.safeParse(req.body);
    if (!result.success) {
      let errors: Record<string, string> = {};
      result.error.issues.map((issue) => {
        errors[issue.path.join(".")] = issue.message;
      });
      res.status(422);
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
    });
    redis.set(session, userInfo, {
      expiration: { type: "EX", value: expirationTime },
    });
    // return success and session
    res.json({ success: true });
  } catch {
    res.status(500);
    res.json({ serverError: true });
  }
});

//signout handler
authHandler.post("/signout", async (req, res) => {
  console.log(req.cookies);
  res.send("wait");

  // try {
  //   let data = await redis.del(session);
  //   console.log(data);
  //   if (!data) {
  //     return { error: "session doesn't exist!" };
  //   }

  //   return { success: true };
  // } catch {
  //   return { serverError: true };
  // }
});
export { authHandler };
