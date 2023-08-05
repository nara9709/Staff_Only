import { comment } from 'postcss';
import { PreviewPost } from '@/model/post';
import { assetsURL, client, urlFor } from './sanity';

// 인기글 포스트 가져오기
export async function getPopularPosts() {
  const sevenDaysAgo = new Date(
    new Date().setDate(new Date().getDate() - 7)
  ).toISOString();

  return client.fetch(`
  *[_type == "post" && _createdAt > "${sevenDaysAgo}" ] | order(viewCount desc)[0..2]{subject,"id": _id, "author": author->username,"createdAt":_createdAt }`);
}

// 카테고리별로 포스트 가져오기
export async function getPostsByCategory(page: string, category?: string) {
  const query =
    category !== 'all'
      ? `*[_type == "post" && category == "${category}"]`
      : `*[_type == "post"]`;
  return client.fetch(`${query} | order(_createdAt desc)[${
    Number(page) === 0 ? page : Number(page) + 9
  }...${(Number(page) + 1) * 20}] {
    subject,
    content,
    viewCount,
    image,
    category,
    "id":_id,
    "comments":count(comments),
    "createdAt":_createdAt,
    "author": {"username":author->username, "image":author->userProfileImage}
  }`);
}

// 포스트 아이디로 포스트 정보 가져오기
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
    "author": {"username":author->username, "image":author->userProfileImage, "id":author->_id},
  }`);
}

// 포스트 아이디로 댓글 목록 가져오기
export async function getCommentsByPostId(postId: string) {
  return client.fetch(`*[_type == "post" && _id == "${postId}"][0]{
    "subComments":subComments[]{"commentToId":commentToId,"commentToUser":{"username":commentToUser->username, "id":commentToUser->_id},"author":{"username":author->username, "image":author->userProfileImage, "id":author->_id},"id":_key, subComment}, "author": {"username":author->username, "id":author->_id, "userProfileImage":author->userProfileImage},
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

// 댓글 지우기
export async function deleteComment(
  postId: string,
  commentId: string,
  commentType: 'comment' | 'subComment'
) {
  const toRemoveComment = `comments[_key=="${commentId}"]`;
  const toRemoveSubComment = `subComments[_key=="${commentId}"]`;

  return client
    .patch(postId)
    .unset([
      `${commentType === 'comment' ? toRemoveComment : toRemoveSubComment}`,
    ])
    .commit();
}

// 새로운 포스트 업로드
export async function createPost(
  userId: string,
  content: string,
  subject: string,
  category: string
) {
  return client.create(
    {
      _type: 'post',
      subject,
      content,
      category,
      viewCount: 0,
      author: { _ref: userId },
      comments: [],
      subComments: [],
    },
    { autoGenerateArrayKeys: true }
  );
}

// 포스트 삭제하기
export async function deletePost(postId: string) {
  return client.delete(postId);
}

// 조회수 증가
export async function incViewCount(postId: string) {
  return client.patch(postId).inc({ viewCount: 1 }).commit();
}

// 북마크된 포스트 정보 가져오기
export async function getBookmarkedPosts(userId: string) {
  return client.fetch(`
  *[_type == "user" && _id == "${userId}"]{
    "posts": bookmarks[]{ _type == 'reference' => @->}{
      ...,
        subject,
    content,
    viewCount,
    image,
    category,
    "id":_id,
    "comments":count(comments),
    "createdAt":_createdAt,
    "author": {"username":author->username, "image":author->userProfileImage}
    }}[0].posts
                                              
                                              `);
}
