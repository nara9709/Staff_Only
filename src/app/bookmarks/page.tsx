import BookmarkList from '@/components/BookmarkList';
import React from 'react';

function BookmarksPage() {
  return (
    <section className="w-full min-h-[100vh] bg-white">
      <h1>
        당신이 <span>북마크</span>한 게시글
      </h1>
      <BookmarkList />
    </section>
  );
}

export default BookmarksPage;
