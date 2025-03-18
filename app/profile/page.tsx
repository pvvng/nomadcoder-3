import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  const user = await db.user.findUnique({
    where: { id: session.id! },
    select: {
      username: true,
      email: true,
      bio: true,
    },
  });

  if (!user) notFound();

  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-lg font-semibold">profile</h1>
      <div>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.bio}</p>
      </div>
      <form action={logout}>
        <button className="px-2 p-1 bg-neutral-200 rounded-md cursor-pointer">
          logout
        </button>
      </form>
    </div>
  );
}
