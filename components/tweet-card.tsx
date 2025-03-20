import { formatToTimeAgo } from "@/lib/utils";
import { HeartIcon as OutLineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import UserAvatar from "./user-avatar";

interface TweetProps {
  author: {
    username: string;
    id: number;
  } | null;
  userId: number;
  tweet: string;
  created_at: Date;
  isUserLiked: boolean;
  likeCount: number;
}

export default function TweetCard({
  author,
  created_at,
  isUserLiked,
  tweet,
  likeCount,
}: TweetProps) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl shadow-md min-h-40">
      <div className="flex gap-3 items-center">
        <UserAvatar />
        <div className="flex flex-col">
          <p className="font-semibold">
            {author?.username || "알 수 없는 사용자"}
          </p>
          <p className="text-sm text-neutral-600">
            {formatToTimeAgo(created_at.toString())}
          </p>
        </div>
      </div>
      <p>{tweet}</p>
      <button
        className="cursor-pointer w-full flex gap-1 
        *:size-6 *:text-red-400 "
      >
        {isUserLiked ? <SolidHeartIcon /> : <OutLineHeartIcon />}
        {likeCount}
      </button>
    </div>
  );
}
