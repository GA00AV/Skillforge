import { Router } from "express";
import { AuthRequest } from "../middlewares.js";
import { prisma } from "../lib/prisma.js";
import { Lecture } from "@prisma/client";
import { getSections, getSignedUrlForThumbnail } from "../lib/utilities.js";

const homeHandler = Router();
homeHandler.get("/user", (req: AuthRequest, res) => {
  res.json({ user: req.user });
});
homeHandler.get("/course/:courseId/", async (req, res) => {
  try {
    let course = await prisma.course.findUnique({
      where: { id: req.params.courseId },
    });
    if (!course) {
      res.status(404);
      return res.json({ error: "Course doesn't exist" });
    }
    let instructor = await prisma.user.findUnique({
      where: { id: course.instructorId },
    });

    let courseInfo = {
      ...course,
      thumbnai: getSignedUrlForThumbnail(
        course.thumbnail,
        course.instructorId,
        course.id
      ),
      instructor: {
        name: instructor?.name,
        email: instructor?.email,
        profileImg: instructor?.profileImg,
      },
      sections: getSections(course.id),
    };
    return res.json(courseInfo);
  } catch (error) {
    console.error("GOT AN ERROR: ", error);
    return res.sendStatus(500);
  }
});
homeHandler.get("/course/:courseId/basic", async (req, res) => {
  try {
    let course = await prisma.course.findUnique({
      where: { id: req.params.courseId },
    });
    if (!course) {
      res.status(404);
      return res.json({ error: "Course doesn't exist" });
    }
    let instructor = await prisma.user.findUnique({
      where: { id: course.instructorId },
    });

    let courseInfo = {
      ...course,
      thumbnai: getSignedUrlForThumbnail(
        course.thumbnail,
        course.instructorId,
        course.id
      ),
      instructor: {
        name: instructor?.name,
        email: instructor?.email,
        profileImg: instructor?.profileImg,
      },
    };
    return res.json(courseInfo);
  } catch (error) {
    console.error("GOT AN ERROR: ", error);
    return res.sendStatus(500);
  }
});
export { homeHandler };
