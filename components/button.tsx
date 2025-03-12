"use client";

import { useFormStatus } from "react-dom";

export default function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full h-12 rounded-4xl bg-neutral-100 text-sm font-semibold transition-colors 
    hover:bg-neutral-200 disabled:bg-neutral-200"
      disabled={pending}
    >
      {pending ? "loading.." : text}
    </button>
  );
}
