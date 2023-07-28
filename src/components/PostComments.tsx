import {
  CommentFromSanity,
  DefaultComment,
  DefaultSubComment,
} from '@/model/post';
import React, {  useState, useTransition } from 'react';
import useSWR, {  useSWRConfig } from 'swr';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { IconButton } from '@mui/material';
import useMe from '@/hooks/useMe';
import { BsArrowReturnRight } from 'react-icons/bs';
import CommentButton from './UI/CommentButton';
import { useRouter } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner';

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
  const uploadNewComment = async (comment: string) => {
    setIsFetching(true);
    await fetch('http://localhost:3000/api/uploadComment', {
      method: 'POST',
      body: JSON.stringify({
        newComment: comment,
        postId,
        userId,
        commentType: 'comment',
      }),
    })
      .then(() => globalMutate('/api/posts')) //
      .then(() => {
        startTransition(() => {
          router.refresh();
        });
      })
      .then(() => setIsFetching(() => false));
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
        (isLoading && (
          <div className="m-auto">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#176B87"
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
            size="xl"
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
