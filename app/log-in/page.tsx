import LoginForm from "@/components/login-form";
import { FireIcon } from "@heroicons/react/24/solid";

export default async function Login() {
  return (
    <div className="w-full p-10">
      {/* fire svg icon */}
      <FireIcon className="size-12 text-red-400 mx-auto" />
      {/* login-form */}
      <LoginForm />
    </div>
  );
}
