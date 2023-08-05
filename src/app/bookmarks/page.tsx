import BookmarkList from '@/components/BookmarkList';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '북마크 포스트',
  description: '당신의 북마크한 포스트들을 확인해보세요',
};

function BookmarksPage() {
  return (
    <section className="w-full  flex justify-center items-center flex-col">
      <h1 className="text-xl mt-4  ">
        당신이 <span className="font-bold text-[#176B87]">북마크</span>한 게시글
      </h1>
      <BookmarkList />
    </section>
  );
}

export default BookmarksPage;
