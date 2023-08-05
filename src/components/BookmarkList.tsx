'use client';
import useMe from '@/hooks/useMe';
import { redirect } from 'next/navigation';
import useSWR from 'swr';

import React from 'react';
import { PreviewPost } from '@/model/post';
import PostCard from './PostCard';

function BookmarkList() {
  const { user } = useMe();

  if (!user) {
    redirect('/login');
  }

  const { data: posts } = useSWR<PreviewPost[]>(
    `/api/getBookmarkedPosts/${user.id}`
  );

  return (
    <div className="w-full">
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <PostCard post={post} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default BookmarkList;
