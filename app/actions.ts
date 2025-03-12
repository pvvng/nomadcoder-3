"use server";

import { createActionResult } from "@/lib/create-action-result";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z
    .string()
    .refine((password) => password === "12345", "Wrong Password"),
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
