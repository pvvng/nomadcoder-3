"use client";

import Button from "./button";
import Input from "./input";
import { login } from "@/app/log-in/actions";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action] = useActionState(login, null);

  return (
    <form
      action={action}
      className="max-w-screen-sm mx-auto flex flex-col gap-3 mt-10"
    >
      <Input
        icon="email"
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        required
        errors={state?.fieldErrors.email}
      />
      <Input
        icon="password"
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        required
        errors={state?.fieldErrors.password}
      />
      <Button text="Log in" />
    </form>
  );
}
