import { client } from './sanity';

export async function getPopularPosts() {
  const sevenDaysAgo = new Date(
    new Date().setDate(new Date().getDate() - 7)
  ).toISOString();

  return client.fetch(`
  *[_type == 'post' && _createdAt > '${sevenDaysAgo}' ] | order(viewCount desc)[0..2]{subject,"id": _id}`);
}
