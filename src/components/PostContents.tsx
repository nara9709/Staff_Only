import { DefaultPost } from '@/model/post';
import React from 'react';
import Avatar from './UI/Avatar';
import { parseDate } from '@/utils/date';
type Props = {
  post: DefaultPost;
};

function PostContents({ post }: Props) {
  const { category, author, subject, createdAt, viewCount, content, image } =
    post;

  return (
    <>
      <div className="pb-4 ">
        <div className="flex justify-between">
          <span className="font-bold text-blue-900 text-lg">{category}</span>
          <span className="text-xs">{parseDate(createdAt)}</span>
        </div>
        <h1 className="text-xl font-bold mt-2 text-stone-700">{subject}</h1>
        <p className="flex items-center mt-2">
          <Avatar image={author.image} size="sm" name={author.username} />
          <span className="ml-2 text-stone-500">
            {author.username} | {viewCount}
          </span>
        </p>
      </div>
      <div className=" border-t-[0.5px] border-t-stone-300 pt-4 min-h-[150px]">
        <p className=" text-lg">{content}</p>
        
      </div>
    </>
  );
}

export default PostContents;
