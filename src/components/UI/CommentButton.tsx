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
    <IconButton onClick={() => onClick(true)}>
      <span
        className={` text-${size} text-blue-900 font-semibold flex items-center`}
      >
        {' '}
        <AiOutlineComment className="mr-1" /> {text}
      </span>
    </IconButton>
  );
}
