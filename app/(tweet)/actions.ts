"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

const TWEETS_COUNT = 20;

export async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
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
    skip: page * TWEETS_COUNT,
    take: TWEETS_COUNT,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

export type TweetsType = Prisma.PromiseReturnType<typeof getTweets>;
