'use client';
import useMe from '@/hooks/useMe';
import { usePosts } from '@/hooks/usePosts';
import { redirect } from 'next/navigation';

import React from 'react';

function BookmarkList() {
  const { user } = useMe();

  if (!user) {
    redirect('/login');
  }

  const bookmarkedPosts = user.bookmarks;

  return <div></div>;
}

export default BookmarkList;
