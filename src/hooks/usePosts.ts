import useSWR from 'swr';
import { PreviewPost } from '@/model/post';
import { useCallback } from 'react';

async function deletePost(id: string) {
  return fetch(`/api/post/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      postId: id,
    }),
  }).then((res) => res.json());
}

export function usePosts(pageNum: number, category: string) {
  const {
    data: posts,
    isLoading,
    mutate,
  } = useSWR<PreviewPost[]>(() => `/api/posts/${pageNum}/${category}`);

  const delPost = useCallback(
    (id: string) => {
      if (!posts) return;

      const newPosts = posts.filter((post) => post.id !== id);

      return mutate(deletePost(id), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, delPost };
}
