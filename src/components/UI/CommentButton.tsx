import React from 'react';
import { IconButton } from '@mui/material';
import { AiOutlineComment } from 'react-icons/ai';

type Props = {
  size: 'sm' | 'lg';
  onClick: (showCommentForm: boolean) => void;
  text: string;
};

export default function CommentButton({ size, onClick, text }: Props) {
  return (
    <span
      onClick={() => onClick(true)}
      className={` text-${size} text-blue-900 hover:cursor-pointer hover:opacity-50 font-semibold flex items-center z-0`}
    >
      {' '}
      <AiOutlineComment className="mr-1" /> {text}
    </span>
  );
}
