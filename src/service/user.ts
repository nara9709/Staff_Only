import { client } from './sanity';

export type OAuthUser = {
  id: string;
  email?: string;
  name: string;
  image?: string;
};

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

export async function getUserByEmail(email: string) {
  return client.fetch(`*[_type == "user" && email == "${email}"]{
    name,
    username,
    "id":_id,
    userProfileImage,
    "calendar":calendar->_id,
    email,
    wagePerHour,
    "bookmars":bookmarks[]->_id
  }`);
}
