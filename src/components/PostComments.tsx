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
import { BsArrowReturnRight } from 'react-icons/bs';
import { AiOutlineComment } from 'react-icons/ai';
import CommentButton from './UI/CommentButton';

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
      method: 'POST',
      body: JSON.stringify({
        newComment: comment,
        postId,
        userId,
        commentType: 'comment',
      }),
    });
  };
  return (
    <div>
      <p className="mb-10">
        스태프 친구들의 댓글{' '}
        <span className=" text-blue-800 font-bold">
          {comments ? comments.length : 0}
        </span>
        개
      </p>

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
        <CommentButton size="xl" onClick={setShowCommentForm} />
      </div>

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
