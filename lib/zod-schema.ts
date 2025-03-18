import { z } from "zod";
import db from "./db";

const emailSchema = z.string();

const usernameSchema = z.string().min(5);

const passwordSchema = z
  .string()
  .min(10)
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d).+$/,
    "password should contain at least one number (0123456789)"
  );

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const createAccountSchema = z
  .object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(async ({ username }, ctx) => {
    const isExist = await db.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (isExist) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 이름입니다.",
        path: ["username"],
        fatal: true,
      });

      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const isExist = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (isExist) {
      ctx.addIssue({
        code: "custom",
        message: "이 이메일로 가입된 계정이 이미 존재합니다.",
        path: ["email"],
        fatal: true,
      });

      return z.NEVER;
    }
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호 불일치",
  });
