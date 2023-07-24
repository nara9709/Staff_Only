import ViewPost from '@/components/ViewPost';

import React from 'react';

type Props = {
  params: {
    postId: string;
  };
};

function PostPage({ params }: Props) {
  return (
    <section>
      <ViewPost id={params.postId} />
    </section>
  );
}

export default PostPage;
