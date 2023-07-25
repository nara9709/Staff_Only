import {
  CommentFromSanity,
  DefaultComment,
  DefaultPost,
  DefaultSubComment,
} from '@/model/post';
import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { IconButton } from '@mui/material';
import useMe from '@/hooks/useMe';

type Props = {
  authorId: string;
  postId: string;
};

function PostComments({ authorId, postId }: Props) {
  const { data } = useSWR<CommentFromSanity>(`/api/comments/${postId}`);
  const comments: DefaultComment[] | undefined = data?.comments;
  const subComments: DefaultSubComment[] | undefined = data?.subComments;
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { user } = useMe();
  const userId = user?.id;

  // 새로운 댓글 업로드
  const uploadNewComment = (comment: string) => {
    fetch('http://localhost:3000/api/uploadComment', {
      method: 'PUT',
      body: JSON.stringify({ newComment: comment, postId, userId,commentType: 'subComment' }),
    });
  };
  return (
    <div>
      <p>스태프 친구들의 댓글 {comments ? comments.length : 0}개</p>

      {comments &&
        comments.map((comment) => (
          <li key={comment.id}>
            <Comment
              fullComment={comment}
              commentType="comment"
              postId={postId}
            />
            <ul>
              {subComments &&
                subComments.map((subComment) => {
                  if (subComment.commentToId === comment.id) {
                    return (
                      <li key={subComment.id}>
                        <Comment
                          fullComment={subComment}
                          commentType="subcomment"
                        />
                      </li>
                    );
                  }
                })}
            </ul>
          </li>
        ))}
      <IconButton onClick={() => setShowCommentForm(true)}>댓글달기</IconButton>
      {showCommentForm && (
        <CommentForm
          toggleShow={setShowCommentForm}
          onSubmit={uploadNewComment}
          postId={postId}
        />
      )}
    </div>
  );
}

export default PostComments;
