import ViewPost from '@/components/ViewPost';

import React from 'react';

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
