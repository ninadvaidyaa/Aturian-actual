import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string().min(3, "Password is required"),
});
export type LoginFormData = z.infer<typeof loginFormSchema>;
