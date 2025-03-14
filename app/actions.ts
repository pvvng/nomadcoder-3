"use server";

import { createActionResult } from "@/lib/create-action-result";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .refine(
      (email) => email.endsWith("@zod.com"),
      "only @zod.com emails are allowed"
    ),
  username: z.string().min(5),
  password: z
    .string()
    .min(10)
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "password should contain at least one number (0123456789)"
    ),
});

export async function login(_: any, formData: FormData) {
  // loading test
  await new Promise((r) => setTimeout(r, 500));

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  // error
  if (!result.success) {
    return createActionResult({
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    });
  }

  // success
  return createActionResult({
    success: true,
    result: "Welcome Back!",
  });
}
