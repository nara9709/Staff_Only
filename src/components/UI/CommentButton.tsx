import React from 'react';
import { IconButton } from '@mui/material';
import { AiOutlineComment } from 'react-icons/ai';

type Props = {
  size: 'sm' | 'xl';
  onClick: (showCommentForm: boolean) => void;
};

export default function CommentButton({ size, onClick }: Props) {
  return (
    <IconButton onClick={() => onClick(true)}>
      <span
        className={` text-${size} text-blue-900 font-semibold flex items-center`}
      >
        {' '}
        <AiOutlineComment className="mr-1" /> 댓글달기
      </span>
    </IconButton>
  );
}
