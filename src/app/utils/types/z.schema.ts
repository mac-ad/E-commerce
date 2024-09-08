import { z, ZodType } from "zod";

export type LoginData = {
  username: string;
  password: string;
};

export const loginSchema: ZodType<LoginData> = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters." }),
  })
  .refine(
    (data) => data.username === "Mikasha@316" && data.password === "12@Dharan",
    {
      message: "Username or password incorrect",
      path: ["password"],
    }
  );
