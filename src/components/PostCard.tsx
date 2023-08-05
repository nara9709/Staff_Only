import { PreviewPost } from '@/model/post';
import React from 'react';
import Avatar from './UI/Avatar';
import { parseDate } from '@/utils/date';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import ToggleButton from './UI/ToggleButton';

import Link from 'next/link';
import useMe from '@/hooks/useMe';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  post: PreviewPost;
  userBookmarks?: string[];
};

function PostCard({ post }: Props) {
  const {
    subject,
    author,
    category,
    content,
    createdAt,
    comments,
    viewCount,
    id,
  } = post;

  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const { setBookmarks, user: userData } = useMe();
  const userBookmarks = userData?.bookmarks;

  const liked = userBookmarks ? userBookmarks.includes(id) : false;

  const handdleLike = (like: boolean) => {
    if (!user) {
      router.push('/login');
    } else {
      setBookmarks(id, like);
    }
  };

  return (
    <div className="w-full h-full mt-4 bg-white pt-6 pb-4 px-4">
      <span></span>
      <Link href={`/post/${post.id}`}>
        <div className="flex flex-col justify-start">
          <p className=" text-xs text-blue-900 font-semibold">{category}</p>
          <p className="text-md font-semibold">{subject}</p>
          <span className="flex items-center text-sm text-gray-500 mt-1 mb-2">
            <span className="mr-1">
              <Avatar image={author.image} name={author.username} size="sm" />
            </span>
            {author.username}
          </span>
          <p className="my-2 text-gray-900 text-ellipsis h-10 w-full overflow-hidden whitespace-nowrap">
            {content}
          </p>
          <p className=" text-[0.7rem] text-gray-500">
            조회수 {viewCount} • 댓글 {comments == null ? 0 : comments} •{' '}
            {parseDate(createdAt)}
          </p>
        </div>
      </Link>
      <p className="flex justify-end items-center">
        <span>
          <ToggleButton
            offIcon={<AiOutlineHeart className="w-7 h-7" />}
            onIcon={<AiFillHeart className="w-7 h-7" fill="rgb(239 68 68)" />}
            onToggle={handdleLike}
            toggled={liked}
          />
        </span>
      </p>
    </div>
  );
}

export default PostCard;
