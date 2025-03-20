import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import TweetCard from "@/components/tweet-card";

interface TweetDetailProps {
  params: Promise<{ id: string }>;
}

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    select: {
      id: true,
      tweet: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
      created_at: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return tweet;
}

export default async function TweetDetail({ params }: TweetDetailProps) {
  const session = await getSession();

  const id = Number((await params).id);

  if (isNaN(id)) return redirect("/");

  const tweet = await getTweet(id);

  if (!tweet) return notFound();

  const checkUserLiked = (likes: { userId: number }[]) => {
    return likes.filter((like) => like.userId === session.id).length > 0;
  };

  return (
    <div className="p-10">
      <div className="flex flex-col gap-5">
        <TweetCard
          author={tweet.user}
          userId={session.id!}
          tweet={tweet.tweet}
          created_at={tweet.created_at}
          likeCount={tweet._count.likes}
          isUserLiked={checkUserLiked(tweet.likes)}
        />
      </div>
    </div>
  );
}
