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
    userProfileImage: image,
    email,
    bookmarks: [],
    wagePerHour: 0,
    wagePerExtraHour: 0,
  });
}
