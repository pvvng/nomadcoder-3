"use client";

import { useState } from "react";
import TweetCard from "./tweet-card";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { getTweets, TweetsType } from "@/app/(tweet)/actions";
import Link from "next/link";

interface TweetsProps {
  initialTweets: TweetsType;
  userId: number;
}
export default function Tweets({ initialTweets, userId }: TweetsProps) {
  const [page, setPage] = useState(0);
  const [tweets, setTweets] = useState(initialTweets);
  const [loading, setLoading] = useState(false);

  const getPrevTweets = async () => {
    if (page > 0) {
      setLoading(true);
      const nextTweets = await getTweets(page - 1);
      setTweets([...nextTweets]);
      setPage((pre) => pre - 1);
    } else {
      alert("첫번째 페이지입니다.");
    }
    setLoading(false);
  };

  const getNextTweets = async () => {
    setLoading(true);
    const nextTweets = await getTweets(page + 1);
    if (nextTweets.length > 0) {
      setTweets([...nextTweets]);
      setPage((pre) => pre + 1);
    } else {
      alert("마지막 페이지입니다.");
    }
    setLoading(false);
  };

  const checkUserLiked = (likes: { userId: number }[]) => {
    return likes.filter((like) => like.userId === userId).length > 0;
  };

  return (
    <div className="flex flex-col gap-3 relative">
      {tweets.map(({ id, tweet, user, created_at, likes, _count }) => (
        <Link key={id} href={`/tweets/${id}`}>
          <TweetCard
            author={user}
            userId={userId}
            tweet={tweet}
            created_at={created_at}
            isUserLiked={checkUserLiked(likes)}
            likeCount={_count.likes}
          />
        </Link>
      ))}
      <div className="flex justify-between items-center sticky bottom-10">
        <button
          className="size-10 transition-all rounded-full p-2 flex justify-center items-center shadow-md 
          hover:scale-90 hover:bg-sky-300 bg-sky-400 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:scale-100"
          aria-label="get-prev-page"
          disabled={loading}
          onClick={getPrevTweets}
        >
          <ChevronLeftIcon className="text-white" />
        </button>
        <button
          className="size-10 transition-all rounded-full p-2 flex justify-center items-center shadow-md 
          hover:scale-90 hover:bg-sky-300 bg-sky-400 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:scale-100"
          aria-label="get-next-page"
          disabled={loading}
          onClick={getNextTweets}
        >
          <ChevronRightIcon className="text-white" />
        </button>
      </div>
    </div>
  );
}
