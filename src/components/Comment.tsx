'use client';
import { DefaultComment, DefaultSubComment } from '@/model/post';
import React, { useState, useTransition } from 'react';
import useMe from '@/hooks/useMe';
import Avatar from './UI/Avatar';
import CommentButton from './UI/CommentButton';
import CommentForm from './CommentForm';
import { AiOutlineDelete } from 'react-icons/ai';
import { useSWRConfig } from 'swr';
import { Comment as CommentSpinner } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const { mutate: globalMutate } = useSWRConfig();

  // 대댓글 업로드
  const uploadSubComment = (comment: string) => {
    setIsFetching(true);
    fetch('/api/uploadComment', {
      method: 'POST',
      body: JSON.stringify({
        newComment: comment,
        userId,
        commentToId: id,
        commentToUserId: author.id,
        commentType: 'subComment',
        postId,
      }),
    })
      .then(() => globalMutate(`/api/post/${postId}`))
      .then(() => {
        startTransition(() => {
          router.refresh();
        });
      })
      .then(() => setIsFetching(() => false));
  };

  // 댓글 삭제
  const deleteComment = () => {
    setIsFetching(true);
    fetch('http://localhost:3000/api/delComment', {
      method: 'PUT',
      body: JSON.stringify({
        postId,
        commentId: id,
        commentType,
      }),
    })
      .then(() => {
        startTransition(() => {
          router.refresh();
        });
      })
      .then(() => globalMutate('/api/comments/'))
      .then(() => setIsFetching(() => false));
  };

  return (
    <div className="pt-2 pb-2 mb-2">
      {isPending && (
        <div className="m-auto flex justify-center items-center">
          <CommentSpinner
            height="80"
            width="80"
            backgroundColor="#176B87"
            color="white"
            visible={true}
          />
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Avatar
            image={author.userProfileImage ?? author.image}
            name={author.username}
            size="sm"
          />
          <span className="ml-2"> {author.username}</span>
        </div>
        {author.id === userId && (
          <AiOutlineDelete
            fill="red"
            onClick={() => deleteComment()}
            className="hover:opacity-50 w-6 h-6 hover:cursor-pointer"
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="pl-2">
          {commentType === 'subcomment' && (
            <span className=" mr-2 font-semibold  text-blue-900">
              {' '}
              @{commentType === 'subcomment' && commentToUser.username}
            </span>
          )}
          {commentType === 'comment' ? comment : subComment}
        </p>
        {commentType === 'comment' && (
          <CommentButton
            size="sm"
            onClick={setShowCommentForm}
            text="답글달기"
          />
        )}
      </div>
      {isUpdating && (
        <div className="flex justify-center items-center">
          <CommentSpinner
            height="80"
            width="80"
            color="#176B87"
            visible={true}
          />
        </div>
      )}
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
