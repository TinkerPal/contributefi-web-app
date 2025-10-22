import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const VerifyEmailSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export const UsernameSchema = z.object({
  username: z.string().min(1, "Username is required"),
});
