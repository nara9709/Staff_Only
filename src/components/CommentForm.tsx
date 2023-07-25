'use client';
import useMe from '@/hooks/useMe';
import { DefaultUserInfo } from '@/model/user';
import React, { FormEvent, useState } from 'react';

type Props = {
  toggleShow: (toggle: boolean) => void;
  onSubmit: (comment: string) => void;
  postId?: string;
  commentTo?: string;
  commentToId?: string;
  commentToUserId: string;
};

function CommentForm({
  toggleShow,
  commentTo,
  commentToId,
  postId,
  commentToUserId,
  onSubmit,
}: Props) {
  const [newComment, setNewComment] = useState('');
  const { user } = useMe();
  const userId = user?.id;

  const handdleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(newComment);
    toggleShow(false);
  };

  return (
    <form>
      {commentTo && <p>@{commentTo}</p>}
      <input
        type="text"
        id="comment"
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      />
      <button onClick={(e) => handdleSubmit(e)}>등록</button>
    </form>
  );
}

export default CommentForm;
