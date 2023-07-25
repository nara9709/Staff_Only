import { PreviewPost } from '@/model/post';
import { client, urlFor } from './sanity';

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
    "comments":count(comments),
    "createdAt":_createdAt,
    "author": {"username":author->username, "image":author->userProfileImage}

  }`);
}

export async function getPostByPostId(postId: string) {
  return client.fetch(`*[_type == "post" && _id == "${postId}"][0]{
    subject,
    content,
    viewCount,
    "category":category->category,
  "id":_id,
    "image":image,
    "comments":count(comments)+count(subComments),
    "createdAt":_createdAt,
    "author": {"username":author->username, "image":author->userProfileImage, "id":_id},
  }`);
}

// 포스트 아이디로 댓글 목록 가져오기
export async function getCommentsByPostId(postId: string) {
  return client.fetch(`*[_type == "post" && _id == "${postId}"][0]{
    "subComments":subComments[]{"commentToId":commentToId,"commentToUser":{"username":commentToUser->username, "id":commentToUser->_id},"author":{"username":author->username, "image":author->userProfileImage},"id":_key, subComment}, "author": {"username":author->username, "id":author->_id, "userProfileImage":author->userProfileImage},
   "postId":_id,
       "comments": comments[]{ ..., "author": {"username":author->username, "id":author->_id, "userProfileImage":author->userProfileImage}, "id":_key, },
      
     }`);
}

// 새로운 댓글 업로드
export async function addNewComment(
  postId: string,
  comment: string,
  authorId: string
) {
  return client
    .patch(postId) //
    .setIfMissing({ comments: [] }) //
    .append('comments', [
      {
        comment,
        _type: 'comment',
        author: {
          _ref: authorId,
          _type: 'reference',
        },
      },
    ]) //
    .commit({ autoGenerateArrayKeys: true });
}

// 대댓글 업로드
export async function addSubComment(
  commentToId: string,
  commentToUserId: string,
  comment: string,
  authorId: string,
  postId: string
) {
  return client
    .patch(postId) //
    .setIfMissing({ subComments: [] }) //
    .append('subComments', [
      {
        subComment: comment,
        commentToId,
        _type: 'subComment',
        author: {
          _ref: authorId,
          _type: 'reference',
        },
        commentToUser: {
          _ref: commentToUserId,
          _type: 'reference',
        },
      },
    ]) //
    .commit({ autoGenerateArrayKeys: true });
}
