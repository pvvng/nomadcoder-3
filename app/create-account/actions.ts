"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { createAccountSchema } from "@/lib/zod-schema";
import { redirect } from "next/navigation";

export async function createAccount(_: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await createAccountSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);

  await db.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword,
    },
  });

  return redirect("/profile");
}
