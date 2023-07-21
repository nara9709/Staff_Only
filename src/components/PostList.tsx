'use client';
import { PreviewPost } from '@/model/post';
import Link from 'next/link';
import React, { useState } from 'react';
import useSWR from 'swr';
import PostCard from './PostCard';
function PostList() {
  const [pageNum, setPageNum] = useState(1);
  const [category, setCategory] = useState('');
  const { data: posts, isLoading } = useSWR<PreviewPost[]>(() => [
    category !== ''
      ? `/api/posts/${category}/${pageNum}`
      : `/api/posts/${pageNum}`,
  ]);

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
    </div>
  );
}

export default PostList;
