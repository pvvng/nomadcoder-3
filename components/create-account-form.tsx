"use client";

import { useActionState } from "react";
import Input from "./input";
import Button from "./button";
import { createAccount } from "@/app/create-account/actions";

export default function CreateAccountForm() {
  const [state, action] = useActionState(createAccount, null);

  return (
    <form
      action={action}
      className="max-w-screen-sm mx-auto flex flex-col gap-3 mt-10"
    >
      <Input
        icon="username"
        id="username"
        name="username"
        placeholder="Username"
        type="text"
        required
        errors={state?.fieldErrors.username}
      />
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
      <Input
        icon="password"
        id="confirm-password"
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        required
        errors={state?.fieldErrors.confirmPassword}
      />
      <Button text="Create Account" />
    </form>
  );
}
