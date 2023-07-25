import { DefaultPost } from '@/model/post';
import React from 'react';
import Avatar from './UI/Avatar';
type Props = {
  post: DefaultPost;
};

function PostContents({ post }: Props) {
  const { category, author, subject, createdAt, viewCount, content } = post;

  console.log(post);
  return (
    <>
      <div>
        <div>
          <span>{category}</span>
          <span>{createdAt}</span>
        </div>
        <h1>{subject}</h1>
        <p>
          <Avatar image={author.image} size="sm" name={author.username} />{' '}
          {author.username} | {viewCount}
        </p>
      </div>
      <div>
        <p>{content}</p>
      </div>
    </>
  );
}

export default PostContents;
