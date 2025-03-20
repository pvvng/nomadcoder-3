import getSession from "@/lib/session";
import Tweets from "@/components/tweets";
import { getTweets } from "./actions";

export default async function Home() {
  const initialTweets = await getTweets(0);
  const session = await getSession();

  return (
    <div className="w-full p-10">
      <Tweets initialTweets={initialTweets} userId={session.id!} />
    </div>
  );
}
