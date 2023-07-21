import React from 'react';
import PopularPosts from './PopularPosts';
import PostList from './PostList';

function PostHome() {
  //카테고리를 상태로 보관하고 있으며 그 카테고리에 따라 가져오는 포스트들이 달라짐(초기값:모든 포스트)
  //포스트를 누르면 'post/[id]'이동하며 이동한 페이지에서는 id를 이용해서 swr로 포스트 내용을 모두 가져온다.

  return (
    <div>
      <PopularPosts />
      <PostList />
    </div>
  );
}

export default PostHome;
