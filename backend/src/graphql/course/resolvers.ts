import { CourseInput, SectionsInput } from "../../types/types.js";
import CourseService from "../services/Course.js";

let Query = {
  courses: async () => {
    console.log("called courses from Query");
    return await CourseService.getCourses();
  },
  course: async (parent: any, payload: { id: string }) => {
    console.log("Called course from Query");
    return await CourseService.getCourse(payload.id);
  },
};
let Mutation = {
  updateCourseBasicInfo: async (
    parent: any,
    payload: { data: CourseInput },
    context: {
      user?: {
        name: string;
        email: string;
        profileImg: string;
        id: string;
      };
    }
  ) => {
    if (context.user) {
      return await CourseService.updateBasics(payload.data, context.user.id);
    }
    throw Error("User is not logged in!");
  },
  updateSections: async (
    parent: any,
    payload: { data: SectionsInput },
    context: {
      user?: {
        name: string;
        email: string;
        profileImg: string;
        id: string;
      };
    }
  ) => {
    if (!context.user) {
      throw Error("User isn't logged in!");
    }
    return await CourseService.updateSections(context.user.id, payload.data);
  },
};

let Course = {
  instructor: async (parent: any) => {
    console.log("called instructor from Course");
    return await CourseService.getInstructor(parent.instructorId);
  },
  sections: async (parent: any) => {
    console.log("called sections from Course");
    return await CourseService.getSections(parent.id);
  },
};
let Section = {
  lectures: async (parent: any) => {
    console.log("called lecture from Course");
    return await CourseService.getLectures(parent.id);
  },
};
export const resolvers = { Query, Course, Section, Mutation };
