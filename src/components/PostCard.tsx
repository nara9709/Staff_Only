import { PreviewPost } from '@/model/post';
import React from 'react';
import Avatar from './UI/Avatar';
import { parseDate } from '@/utils/date';
import { AiOutlineHeart } from 'react-icons/ai';

type Props = {
  post: PreviewPost;
};
function PostCard({ post }: Props) {
  const {
    subject,
    author,
    category,
    content,
    createdAt,
    likes,
    comments,
    viewCount,
  } = post;
  return (
    <div className="w-full h-full mt-4 bg-white pt-6 pb-4 px-4">
      <div className="flex flex-col justify-start">
        <p className=" text-xs text-blue-900 font-semibold">{category}</p>
        <p className="text-md font-semibold">{subject}</p>
        <p className="flex items-center text-sm text-gray-500 mt-1 mb-2">
          <span className="mr-1">
            <Avatar image={author.image} name={author.username} size="sm" />
          </span>
          {author.username}
        </p>
        <p className="my-2 text-gray-900 text-ellipsis h-10 w-full overflow-hidden whitespace-nowrap">
          {content}
        </p>
        <p className=" text-[0.7rem] text-gray-500">
          공감 {likes == null ? '0' : likes} • 조회수 {viewCount} • 댓글{' '}
          {comments == null ? 0 : comments}
        </p>
      </div>
      <p className="flex justify-end items-center">
        <button className="mr-2 font-bold text-gray-500">댓글달기</button>
        <span>
          <AiOutlineHeart className="w-7 h-7" />
        </span>
      </p>
    </div>
  );
}

export default PostCard;
