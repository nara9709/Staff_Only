import { DefaultPost } from '@/model/post';
import React from 'react';
import useSWR from 'swr';
type Props = {
  authorId: string;
  postId: string;
};
function PostComments({ authorId, postId }: Props) {
  const { data: comments } = useSWR(`/api/comments/${postId}`);

  console.log(comments);

  return (
    <div>
      {/* <p>스태프 친구들의 댓글 {comments ? comments.length : 0}개</p> */}
    </div>
  );
}

export default PostComments;
