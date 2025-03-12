import { UserIcon } from "@heroicons/react/24/solid";
import { KeyIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { InputHTMLAttributes } from "react";

interface InputProps {
  icon: "email" | "username" | "password";
  id: string;
  name: string;
  errors?: string[];
}

export default function Input({
  icon,
  id,
  name,
  errors,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const iconMap = {
    email: <EnvelopeIcon />,
    username: <UserIcon />,
    password: <KeyIcon />,
  };

  return (
    <>
      <div
        className="w-full border border-neutral-300 rounded-4xl flex gap-3 items-center p-1 px-5 transition-all
        focus-within:ring-1 focus-within:ring-neutral-300 focus-within:ring-offset-2
        aria-[invalid=true]:border-red-300 aria-[invalid=true]:ring-red-300"
        aria-invalid={errors ? "true" : "false"}
      >
        <label htmlFor={id} className="*:size-5 *:text-neutral-500">
          {iconMap[icon]}
        </label>
        <input
          className="w-full h-10 border-none focus:border-none focus:outline-none"
          id={id}
          name={name}
          {...rest}
        />
      </div>
      {errors?.map((error, i) => (
        <p key={error + i} className="text-red-500 text-sm">
          {error}
        </p>
      ))}
    </>
  );
}
