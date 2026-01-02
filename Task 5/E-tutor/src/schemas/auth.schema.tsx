import z from "zod";

export const SignUpSchema = z
  .object({
    fullname: z.object({
      firstName: z.string().min(1, "Firstname is required"),
      lastName: z.string().min(1, "Lastname is required"),
    }),
    username: z.string().min(1, "Username is required"),
    email: z.string().email().min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be atleast 8 character.")
      .max(20, "Password mustnot exceed 20 character")
      .regex(/[A-Z]/, "Must include atleast 1 uppercase character")
      .regex(/[a-z]/, "Must contain atleast one lowercase character")
      .regex(/[0-9]/, "Must contain atleast one digit")
      .regex(/[!@#$%^&*]/, "Must contain atleast one special character."),
    confirmpassword: z
      .string()
      .min(8, "Password must be atleast 8 character.")
      .max(20, "Password mustnot exceed 20 character")
      .regex(/[A-Z]/, "Must include atleast 1 uppercase character")
      .regex(/[a-z]/, "Must contain atleast one lowercase character")
      .regex(/[0-9]/, "Must contain atleast one digit")
      .regex(/[!@#$%^&*]/, "Must contain atleast one special character."),
  })
  .superRefine(({ password, confirmpassword }, ctx) => {
    if (password !== confirmpassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match",
        path: ["confirmpassword"],
      });
    }
  });

export const SignInSchema = z.object({
  email: z.string().trim().min(1, "Email is required"),
  password: z.string().trim().min(1, "Password is required"),
});

export type SignupDataType = z.infer<typeof SignUpSchema>;
export type SignInDataType = z.infer<typeof SignInSchema>;
