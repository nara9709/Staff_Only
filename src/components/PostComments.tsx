'use client';
import {
  CommentFromSanity,
  DefaultComment,
  DefaultSubComment,
} from '@/model/post';
import React, { useState, useTransition } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Comment from './Comment';
import CommentForm from './CommentForm';
import useMe from '@/hooks/useMe';
import { BsArrowReturnRight } from 'react-icons/bs';
import CommentButton from './UI/CommentButton';

import { Comment as CommentSpinner } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

type Props = {
  authorId: string;
  postId: string;
};

function PostComments({ authorId, postId }: Props) {
  const { data, isLoading } = useSWR<CommentFromSanity>(
    `/api/comments/${postId}`
  );

  const comments: DefaultComment[] | undefined = data?.comments;
  const subComments: DefaultSubComment[] | undefined = data?.subComments;
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { user } = useMe();
  const userId = user?.id;
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const { mutate: globalMutate } = useSWRConfig();

  // 새로운 댓글 업로드
  const uploadNewComment = (comment: string) => {
    setIsFetching(true);
    fetch('/api/uploadComment', {
      method: 'POST',
      body: JSON.stringify({
        newComment: comment,
        postId,
        userId,
        commentType: 'comment',
      }),
    })
      .then(() => globalMutate(`/api/post/${postId}`)) //
      .then(() => setIsFetching(() => false))
      .then(() => {
        startTransition(() => {
          router.refresh();
        });
      });
  };
  return (
    <>
      <div>
        <p className="mb-10">
          스태프 친구들의 댓글{' '}
          <span className=" text-blue-800 font-bold">
            {comments ? comments.length : 0}
          </span>
          개
        </p>

        {isUpdating ||
          isFetching ||
          (isLoading && (
            <div className="m-auto flex justify-center items-center">
              <CommentSpinner
                height="80"
                width="80"
                backgroundColor="#176B87"
                color="white"
                visible={true}
              />
            </div>
          ))}

        <ul>
          {comments &&
            comments.map((comment) => (
              <li
                key={comment.id}
                className=" border-t-[0.5px] border-t-stone-400 pt-2 "
              >
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
                          <li key={subComment.id} className="flex items-center">
                            <BsArrowReturnRight className="mr-2" />
                            <Comment
                              fullComment={subComment}
                              commentType="subcomment"
                              postId={postId}
                            />
                          </li>
                        );
                      }
                    })}
                </ul>
              </li>
            ))}
        </ul>
        <div className="flex justify-center">
          <CommentButton
            size="lg"
            onClick={setShowCommentForm}
            text="댓글달기"
          />
        </div>

        {showCommentForm && (
          <CommentForm
            toggleShow={setShowCommentForm}
            onSubmit={uploadNewComment}
            postId={postId}
          />
        )}
      </div>
    </>
  );
}

export default PostComments;
