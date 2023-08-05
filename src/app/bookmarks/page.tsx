import BookmarkList from '@/components/BookmarkList';
import React from 'react';

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
