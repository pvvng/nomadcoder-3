"use client";

import Button from "./button";
import Input from "./input";
import { login } from "@/app/actions";
import { deafultActionStateValue } from "@/lib/create-action-result";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action] = useActionState(login, deafultActionStateValue);

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
        errors={state.fieldErrors.email}
      />
      <Input
        icon="username"
        id="username"
        name="username"
        placeholder="Username"
        type="text"
        required
        errors={state.fieldErrors.username}
      />
      <Input
        icon="password"
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        required
        errors={state.fieldErrors.password}
      />
      <Button text="Log in" />
      {/* success-msg */}
      {state.success && (
        <div className="w-full bg-emerald-500 p-5 rounded-xl flex gap-3 items-center *:font-semibold">
          <InformationCircleIcon className="size-6" />
          <p>{state.result}</p>
        </div>
      )}
    </form>
  );
}
