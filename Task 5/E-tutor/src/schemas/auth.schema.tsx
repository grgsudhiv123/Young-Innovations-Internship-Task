import z from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 character.")
    .max(20, "Password mustnot exceed 20 character")
    .regex(/[A-Z]/, "Must include atleast 1 uppercase character")
    .regex(/[a-z]/, "Must contain atleast one lowercase character")
    .regex(/[0-9]/, "Must contain atleast one digit")
    .regex(/[!@#$%^&*]/, "Must contain atleast one special character."),
});

export const SignInSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(1, "Password is required"),
});
