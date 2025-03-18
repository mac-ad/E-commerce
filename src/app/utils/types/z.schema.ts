import { z, ZodType } from "zod";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {  
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const loginSchema: ZodType<LoginData> = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(2, { message: "Email must be at least 2 characters." }),
  password: z
    .string()
    // .min(2, { message: "Password must be at least 2 characters." })
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{2,}$/,
    //   {
    //     message:
    //       "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    //   }
    // ),
});
// .refine(
//   (data) => data.email === "Mikasha@316" && data.password === "12@Dharan",
//   {
//     message: "Username or password incorrect",
//     path: ["password"],
//   }
// );

export const registerSchema: ZodType<RegisterData> = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Fullname must be of atleast 2 characters" }),
    email: z
      .string()
      .email({ message: "Invalid email" })
      .min(2, { message: "Email must be at least 2 characters." }),
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{2,}$/,
        {
          message:
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }
      ),
    confirmPassword: z
      .string()
      .min(2, { message: "Password must be at least 2 characters." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{2,}$/,
        {
          message:
            "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }
      ),
  })
  .refine((user) => user.password == user.confirmPassword, {
    message: "Confirm password and password don't match",
    path: ["confirmPassword"],
  });
