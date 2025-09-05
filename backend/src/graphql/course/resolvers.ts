import {
  CourseInput,
  SectionsInput,
  SectionsUpload,
  UploadFiles,
} from "../../types/types.js";
import CourseService from "../services/Course.js";

let Query = {
  courses: async () => {
    return await CourseService.getCourses();
  },
  course: async (parent: any, payload: { id: string }) => {
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
    if (!context.user) {
      throw Error("User is not logged in!");
    }
    return await CourseService.updateBasics(payload.data, context.user.id);
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
    return await CourseService.getInstructor(parent.instructorId);
  },
  sections: async (parent: any) => {
    return await CourseService.getSections(parent.id);
  },
};
let Section = {
  lectures: async (parent: any) => {
    return await CourseService.getLectures(parent.id);
  },
};

let UploadFiles = {
  Sections: async (parent: UploadFiles) => {
    return parent.Sections;
  },
};
const SectionsUpload = {
  Lectures: async (parent: SectionsUpload) => {
    return parent.Lectures;
  },
};
export const resolvers = {
  Query,
  Course,
  Section,
  Mutation,
  UploadFiles,
  SectionsUpload,
};
