import { email, z } from "zod";
const userSignupType = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
const userLoginType = z.object({
  email: z.string().email(),
  password: z.string(),
});
export { userLoginType, userSignupType };
