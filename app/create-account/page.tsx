import CreateAccountForm from "@/components/create-account-form";
import { FireIcon } from "@heroicons/react/24/solid";

export default function CreateAccount() {
  return (
    <div className="w-full p-10">
      {/* fire svg icon */}
      <FireIcon className="size-12 text-red-400 mx-auto" />
      {/* login-form */}
      <CreateAccountForm />
    </div>
  );
}
