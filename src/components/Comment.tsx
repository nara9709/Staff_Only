import { DefaultComment, DefaultSubComment } from '@/model/post';
import { IconButton } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import CommentForm from './CommentForm';
import useMe from '@/hooks/useMe';
type Props = {
  fullComment: DefaultComment | DefaultSubComment;
  commentType: 'comment' | 'subcomment';
  postId?: string;
};

function Comment({ fullComment, commentType, postId }: Props) {
  const { comment, id, author, subComments, subComment }: any = fullComment;
  const [showCommentForm, setShowCommentForm] = useState(false);
  console.log(author);
  const { user } = useMe();
  const userId = user?.id;

  // 대댓글 업로드
  const uploadSubComment = (comment: string) => {
    fetch('http://localhost:3000/api/uploadComment', {
      method: 'PUT',
      body: JSON.stringify({
        newComment: comment,
        userId,
        commentToId: id,
        commentToUserId: author.id,
        commentType: 'subComment',
        postId,
      }),
    });
  };

  return (
    <div>
      <p>{commentType === 'comment' ? comment : subComment}</p>
      {commentType === 'comment' && (
        <IconButton onClick={() => setShowCommentForm(true)}>
          답글달기
        </IconButton>
      )}
      {showCommentForm && (
        <CommentForm
          toggleShow={setShowCommentForm}
          onSubmit={uploadSubComment}
          commentTo={author.username}
          commentToId={id}
          commentToUserId={author.id}
        />
      )}
    </div>
  );
}

export default Comment;
