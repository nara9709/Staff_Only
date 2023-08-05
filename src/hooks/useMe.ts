import { DefaultUserInfo } from '@/model/user';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(
  postId: string,
  bookmark: boolean,
  userId: string
) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ postId, bookmark, userId: userId }),
  }).then((res) => res.json());
}

async function updateProfile(username: string, wage: number, userId: string) {
  return fetch('/api/me', {
    method: 'PUT',
    body: JSON.stringify({ userId, username, wage }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: session } = useSession();

  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR<DefaultUserInfo>(session ? '/api/me' : null);

  const setProfile = useCallback(
    (username: string, wage: number) => {
      if (!user) return;

      const newUser = {
        ...user,
        username: username,
        wagePerHour: wage,
      };

      return mutate(updateProfile(username, wage, user.id), {
        optimisticData: newUser,
        rollbackOnError: true,
        populateCache: false,
        revalidate: false,
      });
    },
    [user, mutate]
  );

  const setBookmarks = useCallback(
    (postId: string, bookmark: boolean) => {
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
    },
    [user, mutate]
  );

  return { user, isLoading, error, setBookmarks, setProfile };
}
