import { FireIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-full p-10">
      <FireIcon className="size-12 text-red-400 mx-auto" />
      <div
        className="flex gap-2 justify-center items-center mt-5 
      *:text-blue-600 *:hover:text-blue-500 *:transition-colors"
      >
        <Link href="/log-in">로그인</Link>
        <Link href="/create-account">회원가입</Link>
      </div>
    </div>
  );
}
