'use client';
import { DefaultPost, PreviewPost } from '@/model/post';
import React from 'react';
import useSWR from 'swr';
import PostContents from './PostContents';
import PostComments from './PostComments';
type Props = {
  id: string;
};
function ViewPost({ id }: Props) {
  const { data: post, isLoading } = useSWR<PreviewPost & { image: string }>(
    `/api/post/${id}`
  );

  console.log(post);
  return (
    <div>
      {post && (
        <>
          <PostContents post={post} />
          <PostComments authorId={post.author.id} postId={id} />
        </>
      )}
    </div>
  );
}

export default ViewPost;
