import ViewPost from '@/components/ViewPost';
import { Metadata } from 'next';

import React from 'react';

export const metadata: Metadata = {
  title: '포스트',
  description: '다양한 포스트들을 확인해보세요',
};

type Props = {
  params: {
    postId: string;
  };
};

function PostPage({ params }: Props) {
  return (
    <section className=" bg-white min-h-[100vh]">
      <ViewPost id={params.postId} />
    </section>
  );
}

export default PostPage;
