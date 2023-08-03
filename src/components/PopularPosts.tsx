'use client';

import React from 'react';
import useSWR from 'swr';
import { Skeleton } from '@mui/material';
import { PopularPost } from '@/model/post';
import Link from 'next/link';
import { parseDate } from '@/utils/date';

function PopularPosts() {
  const { data: posts, isLoading } = useSWR<PopularPost[]>('/api/popularPosts');

  return (
    <div className="w-full h-full pb-5 bg-white pt-5 px-3">
      <h1 className=" text-gray-700 font-semibold mb-2 md:text-2xl md:mb-5">
        지난 7일 <span className="font-bold text-[#176B87] ">인기글 🎉</span>
      </h1>

      {posts && (
        <div className="w-full h-full border-2 border-[#176B87] rounded-lg bg-white p-2 pt-0">
          <ul className="flex flex-col">
            {posts?.length === 0 && (
              <p className="p-1">
                지난 7일동안 새로 올라온 게시글이 없습니다🥲
              </p>
            )}
            {posts.map((post, index) => (
              <li
                key={index}
                className={`${
                  index < 2 && 'border-b border-gray-500 py-1  overflow-hidden'
                }`}
              >
                <Link href={`/post/${post.id} `}>
                  <p
                    className="text-md my-1 hover:opacity-50 md:text-xl w-[320px]
                    md:w-[500px]
                    text-ellipsis overflow-hidden
                     whitespace-nowrap
                  "
                  >
                    <span className="text-sm font-bold text-blue-900 md:text-lg">
                      {index + 1}.
                    </span>
                    <span className="mr-1"> {post.subject}</span> ·
                    <span className=" text-sm text-stone-600 ml-1 mr-1">
                      {post.author}
                    </span>
                    ·{' '}
                    <span className=" text-sm text-stone-600 ml-1">
                      {parseDate(post.createdAt)}
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100"
          height="150px"
          className="rounded-md mt-2"
        />
      )}
    </div>
  );
}

export default PopularPosts;
