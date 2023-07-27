'use client';
import useMe from '@/hooks/useMe';
import { comment } from 'postcss';
import React, { FormEvent, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
  toggleShow: (toggle: boolean) => void;
  onSubmit: (comment: string) => void;
  postId?: string;
  commentTo?: string;
  commentToId?: string;
};

function CommentForm({ toggleShow, commentTo, onSubmit }: Props) {
  const [newComment, setNewComment] = useState('');
  const buttonDisabled = comment.length === 0;

  const handdleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(newComment);
    toggleShow(false);
  };

  return (
    <form className=" h-[250px] w-full bg-blue-950 absolute left-0 bottom-0 flex flex-col items-center ">
      {commentTo && <p>@{commentTo}</p>}
      <AiOutlineClose
        className="fixed right-0 pr-2 w-11 h-10"
        fill="#fff"
        onClick={() => toggleShow(false)}
      />
      <input
        type="text"
        id="comment"
        className=" w-10/12 text-lg p-2 rounded-md mt-14"
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
        placeholder="스태프님께 댓글을 달아주세요🤗"
        required
      />
      <button
        onClick={(e) => handdleSubmit(e)}
        disabled={buttonDisabled}
        className={` text-lg font-bold text-white mt-3 ${
          buttonDisabled && ' text-gray-400'
        } `}
      >
        등록
      </button>
    </form>
  );
}

export default CommentForm;
