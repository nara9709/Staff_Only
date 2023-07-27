import { DefaultComment, DefaultSubComment } from '@/model/post';
import React, { FormEvent, useState } from 'react';
import useMe from '@/hooks/useMe';
import Avatar from './UI/Avatar';
import CommentButton from './UI/CommentButton';
import CommentForm from './CommentForm';
import { AiOutlineDelete } from 'react-icons/ai';

type Props = {
  fullComment: DefaultComment | DefaultSubComment;
  commentType: 'comment' | 'subcomment';
  postId?: string;
};

function Comment({ fullComment, commentType, postId }: Props) {
  const { comment, id, author, subComment, commentToUser }: any = fullComment;
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { user } = useMe();
  const userId = user?.id;

  // 대댓글 업로드
  const uploadSubComment = (comment: string) => {
    fetch('http://localhost:3000/api/uploadComment', {
      method: 'POST',
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

  // 댓글 삭제
  const deleteComment = () => {
    fetch('http://localhost:3000/api/delComment', {
      method: 'PUT',
      body: JSON.stringify({
        postId,
        commentId: id,
        commentType,
      }),
    });
  };

  return (
    <div className="pt-2 pb-2 mb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Avatar
            image={author.userProfileImage}
            name={author.username}
            size="sm"
          />
          <span className="ml-2"> {author.username}</span>
        </div>
        {author.id === userId && (
          <AiOutlineDelete
            fill="red"
            onClick={deleteComment}
            className="hover:opacity-50 w-6 h-6"
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <p>
          {commentType === 'subcomment' && (
            <span className=" mr-2 font-semibold text-blue-900">
              {' '}
              @{commentType === 'subcomment' && commentToUser.username}
            </span>
          )}
          {commentType === 'comment' ? comment : subComment}
        </p>
        {commentType === 'comment' && (
          <CommentButton size="sm" onClick={setShowCommentForm} />
        )}
      </div>
      {showCommentForm && (
        <CommentForm
          toggleShow={setShowCommentForm}
          onSubmit={uploadSubComment}
          commentTo={author.username}
          commentToId={id}
        />
      )}
    </div>
  );
}

export default Comment;
