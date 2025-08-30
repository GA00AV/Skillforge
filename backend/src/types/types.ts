import { email, z } from "zod";
export const userSignupType = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
export const userLoginType = z.object({
  email: z.string().email(),
  password: z.string(),
});

// basic course info
export const CourseBasicInfo = z.object({
  title: z.string(),
  description: z.string(),
  catergory: z.string(),
  price: z.number(),
  thumbnail: z.boolean(),
});

// sections info
export const sectionUploadType = z.object({
  Sections: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      courseId: z.string(),
      lectures: z.array(
        z.object({
          id: z.string(),
          upload: z.boolean(),
          title: z.string(),
          duration: z.number(),
          description: z.string(),
        })
      ),
    })
  ),
});
export interface LectureFromUser {
  id: string;
  upload: boolean;
  title: string;
  duration: number;
  description: string;
}
