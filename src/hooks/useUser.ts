import { DefaultUserInfo } from '@/model/user';
import useSWR from 'swr';

async function updateBookmark(
  postId: string,
  bookmark: boolean,
  userId: string
) {
  return fetch('api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ postId, bookmark, userId: userId }),
  }).then((res) => res.json());
}

export default function useUser(): any {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<DefaultUserInfo>('/api/me');

  const setBookmarks = (postId: string, bookmark: boolean) => {
    if (!user) return;

    const bookmarks = user?.bookmarks;
    const newUser = {
      ...user,
      bookmarks: bookmarks
        ? [...user.bookmarks, postId]
        : user.bookmarks.filter((id) => id !== postId),
    };

    return mutate(updateBookmark(postId, bookmark, user.id), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { user, isLoading, error, setBookmarks };
}
