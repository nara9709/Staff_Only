import React from 'react';
import PopularPosts from './PopularPosts';
import PostList from './PostList';
import { IconButton } from '@mui/material';
import { TfiWrite } from 'react-icons/tfi';
import Link from 'next/link';

function PostHome() {
  return (
    <div>
      <PopularPosts />
      <PostList />
      <Link href="post/new">
        <div className=" w-14 h-14 md:w-20 md:h-20 bg-[#176B87] rounded-full fixed right-[20px] bottom-[90px] z-10 flex flex-col items-center justify-center  ">
          <IconButton size="large" className="p-0">
            <TfiWrite className="w-6 h-6 md:w-10 md:h-10" fill="white" />
          </IconButton>
        </div>
      </Link>
    </div>
  );
}

export default PostHome;
