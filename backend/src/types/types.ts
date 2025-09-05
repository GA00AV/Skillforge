import { z } from "zod";
export const userSignupType = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
export const userLoginType = z.object({
  email: z.email(),
  password: z.string(),
});

export type CourseInput = {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: boolean;
  price: number;
};

export type LectureInput = {
  id: string;
  title: string;
  description: string;
  duration: number;
  upload: boolean;
};
export type SectionInput = {
  id: string;
  title: string;
  lectures: LectureInput[];
};
export type SectionsInput = {
  sections: SectionInput[];
  courseId: string;
  deletedLectures: string[];
  deletedSections: string[];
};
export type ThumbnailUploadUrl = {
  courseid: string;
  url: string;
};
export type UploadFiles = {
  Sections: SectionsUpload[];
};

export type SectionsUpload = {
  sectionId: string;
  Lectures: LectureUpload[];
};
export type LectureUpload = {
  lectureId: string;
  url: string;
};
