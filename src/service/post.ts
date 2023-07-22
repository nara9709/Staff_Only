import { client } from './sanity';

// 인기글 포스트 가져오기
export async function getPopularPosts() {
  const sevenDaysAgo = new Date(
    new Date().setDate(new Date().getDate() - 7)
  ).toISOString();

  return client.fetch(`
  *[_type == 'post' && _createdAt > '${sevenDaysAgo}' ] | order(viewCount desc)[0..2]{subject,"id": _id}`);
}

// 카테고리가 전달 되었다면 카테고리에 있는 포스트를, 없다면 모든 포스트를 가져오기
export async function getPostsByCategory(page: string, category?: string) {
  const query = category
    ? `*[_type == "post" && category->category == "${category}"]`
    : `*[_type == "post"]`;
  return client.fetch(`${query} | order(_createdAt desc)[${
    Number(page) === 0 ? page : Number(page) + 9
  }...${(Number(page) + 1) * 20}] {
    subject,
    content,
    viewCount,
    "category":category->category,
    "id":_id,
    "image":image,
    "comments":count(comments),
    "createdAt":_createdAt,
    "author": {"username":author->username, "image":author->userProfileImage}

  }`);
}
