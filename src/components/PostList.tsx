'use client';

import { PreviewPost } from '@/model/post';

import React, { useState } from 'react';
import useSWR from 'swr';
import PostCard from './PostCard';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { Drawer, IconButton, Skeleton } from '@mui/material';
import useMe from '@/hooks/useMe';
import { usePosts } from '@/hooks/usePosts';

function PostList() {
  const [pageNum, setPageNum] = useState(0);
  const [category, setCategory] = useState('all');
  const [showCategory, setShowCategory] = useState(false);
  const categories = [
    '모두보기',
    '카페',
    '프렌차이즈',
    '엔터테인먼트',
    '배달전문',
    '사무보조',
    '주점',
    '식당',
    '드럭스토어',
  ];

  const { posts, isLoading } = usePosts(pageNum, category);

  const { user } = useMe();

  const iconStyle = ' w-7 h-7 md:w-8 md:h-8';

  return (
    <div>
      <button
        className="p-2 mt-3 ml-3 rounded-lg font-semibold bg-[#176B87] text-white text-lg"
        onClick={() => setShowCategory(true)}
      >
        카테고리
      </button>
      {category !== 'all' && (
        <span className="text-sm  text-[#176B87]">
          {' > '}
          {category}
        </span>
      )}
      <Drawer open={showCategory} onClose={() => setShowCategory(false)}>
        <ul className="flex flex-col gap-4 items-center m-auto text-lg p-4 font-thin">
          {categories.map((category, index) => {
            return (
              <li
                key={index}
                className="hover:opacity-50 hover:cursor-pointer"
                onClick={() => {
                  if (category === '모두보기') {
                    setCategory('all');
                  } else {
                    setCategory(category);
                  }
                  setShowCategory(false);
                }}
              >
                {' '}
                {category}{' '}
              </li>
            );
          })}
        </ul>
      </Drawer>
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <PostCard post={post} userBookmarks={user && user.bookmarks} />
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
            className="mb-2"
            onClick={() =>
              setPageNum(() => {
                return pageNum + 1;
              })
            }
          >
            <GrLinkNext className={iconStyle} fill="#fff" />
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
