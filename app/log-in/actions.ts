"use server";

import db from "@/lib/db";
import LogUserIn from "@/lib/login";
import { loginSchema } from "@/lib/zod-schema";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function login(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  // error
  if (!result.success) {
    return result.error.flatten();
  }

  const user = await db.user.findUnique({
    where: { email: result.data.email },
    select: {
      password: true,
      id: true,
    },
  });

  if (!user) {
    return {
      fieldErrors: {
        email: ["가입되지 않은 계정입니다."],
        password: undefined,
      },
    };
  }

  const ok = await bcrypt.compare(result.data.password, user!.password ?? "");

  if (ok) {
    await LogUserIn(user!.id);
    redirect("/profile");
  }

  return {
    fieldErrors: {
      email: undefined,
      password: ["잘못된 비밀번호입니다."],
    },
  };
}
