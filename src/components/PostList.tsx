'use client';

import { PreviewPost } from '@/model/post';
import Link from 'next/link';
import React, { useState } from 'react';
import useSWR from 'swr';
import PostCard from './PostCard';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { IconButton, Skeleton } from '@mui/material';

function PostList() {
  const [pageNum, setPageNum] = useState(0);
  const [category, setCategory] = useState('');
  const { data: posts, isLoading } = useSWR<PreviewPost[]>(() => [
    category !== ''
      ? `/api/posts/${category}/${pageNum}`
      : `/api/posts/${pageNum}`,
  ]);

  const iconStyle = ' w-7 h-7 md:w-8 md:h-8';

  return (
    <div>
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <Link href={`/post/${post.id}`}>
                <PostCard post={post} />
              </Link>
            </li>
          ))}
      </ul>
      <div className="flex justify-center items-center gap-2 mt-2">
        {pageNum > 0 && (
          <IconButton
            size="large"
            onClick={() =>
              setPageNum(() => {
                return pageNum - 1;
              })
            }
          >
            <GrLinkPrevious className={iconStyle} />
          </IconButton>
        )}
        {posts && posts.length !== 0 && (
          <IconButton
            size="large"
            onClick={() =>
              setPageNum(() => {
                return pageNum + 1;
              })
            }
          >
            <GrLinkNext className={iconStyle} />
          </IconButton>
        )}
        {!isLoading && posts?.length == 0 && (
          <p>더 이상 읽을 수 있는 글이 없어요🥲</p>
        )}
      </div>
      {isLoading && (
        <div className="p-2">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100"
            height="170px"
            className="rounded-md mt-2"
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100"
            height="170px"
            className="rounded-md mt-2"
          />
        </div>
      )}
    </div>
  );
}

export default PostList;
