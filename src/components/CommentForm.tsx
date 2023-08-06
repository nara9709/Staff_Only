'use client';
import useMe from '@/hooks/useMe';
import { IconButton } from '@mui/material';
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
    <form className=" h-[350px] p-4 pt-6 rounded-xl w-full bg-[#165f77] absolute left-0 bottom-0 z-[1] flex flex-col items-center ">
      <AiOutlineClose
        className="fixed right-0 pr-2 w-11 h-10 hover:cursor-pointer hover:opacity-50"
        fill="#fff"
        onClick={() => toggleShow(false)}
      />
      {commentTo && <p className="text-white font-semibold">@{commentTo}</p>}
      <input
        type="text"
        id="comment"
        className=" w-10/12 text-lg p-2 rounded-md mt-14 focus:outline-none "
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
        placeholder="스태프님께 댓글을 달아주세요🤗"
        required
        autoFocus
      />
      <button
        onClick={(e) => handdleSubmit(e)}
        disabled={buttonDisabled}
        className={` text-lg font-bold text-white mt-6 hover:opacity-50 ${
          buttonDisabled && ' text-gray-400'
        } `}
      >
        ✨댓글달기✨
      </button>
    </form>
  );
}

export default CommentForm;
