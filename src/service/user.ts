import { DefaultUserInfo } from '@/model/user';
import { client } from './sanity';

export type OAuthUser = {
  id: string;
  email: string;
  name: string;
  image?: string;
};

// 새로운 유저 추가
export async function addUser({ id, email, image, name }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    name,
    username: name,
    userProfileImage: image
      ? image
      : 'https://res.cloudinary.com/nara9709/image/upload/v1689902323/default_user_image_raeiw6.png',
    email,
    bookmarks: [],
    wagePerHour: 0,
  });
}

// 이메일로 유저 정보 가져오기
export async function getUserByEmail(email: string) {
  return (
    client
      .fetch(
        `*[_type == "user" && email == "${email}"][0]{
    name,
    username,
    "id":_id,
    userProfileImage,
    "calendar":calendar->_id,
    email,
    wagePerHour,
    "bookmarks":bookmarks[]->_id
  }`
      )
      // 북마크 된 포스트가 하나도 없다면 북마크 값에 빈 배열을 넣어줌
      .then((user: DefaultUserInfo) => {
        return {
          ...user,
          bookmarks: user.bookmarks ?? [],
        };
      })
  );
}

// 좋아요한 포스트를 사용자의 북마크에 추가
export async function bookmarkPost(postId: string, userId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] }) //
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ]) //
    .commit({ autoGenerateArrayKeys: true });
}

// 좋아요를 해지한 포스트를 사용자의 북마크에서 삭제
export async function unbookmarkPost(postId: string, userId: string) {
  return client
    .patch(userId) //
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}
