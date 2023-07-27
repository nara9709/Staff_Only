// 'use client';

// import { CommentFromSanity, DefaultComment } from '@/model/post';
// import useSWR from 'swr';

// type Arg = {
//   postId: string;
//   userId: string;
//   newComment: string;
//   commentType: 'comment' | 'subComment';
//   commentToId?: string;
//   commentToUserId?: string;
// };

// async function uploadComment({
//   postId,
//   userId,
//   newComment,
//   commentType,
//   commentToId,
//   commentToUserId,
// }: Arg) {
//   if (commentType === 'comment') {
//     // 새로운 댓글 업로드
//     return fetch('http://localhost:3000/api/uploadComment', {
//       method: 'POST',
//       body: JSON.stringify({
//         newComment,
//         postId,
//         userId,
//         commentType: 'comment',
//       }),
//     });
//   } else if (commentType === 'subComment') {
//     // 대댓글 업로드

//     return fetch('http://localhost:3000/api/uploadComment', {
//       method: 'POST',
//       body: JSON.stringify({
//         newComment,
//         userId,
//         commentToId,
//         commentToUserId,
//         commentType: 'subComment',
//         postId,
//       }),
//     });
//   }
// }

// export function useComments(postId: string) {
//   const { data, isLoading, error, mutate } = useSWR<CommentFromSanity>(
//     `/api/comments/${postId}`
//   );

//   const addComment = (
//     {
//       postId,
//       userId,
//       newComment,
//       commentType,
//       commentToId,
//       commentToUserId,
//     }: Arg,
//     authorUsername: string,
//     authorUserImage: string,
//     commentToUsername?: string
//   ) => {
//     const commentList =
//       commentType === 'comment' ? data?.comments : data?.subComments;

//     let toBeAddedComment = {};
//     let arg;

//     if (commentType === 'comment') {
//       toBeAddedComment = {
//         comment: newComment,
//         author: {
//           username: authorUsername,
//           userProfileImage: authorUserImage,
//         },
//       };

//       const commentType = 'comment';
//       arg = {
//         newComment,
//         postId,
//         userId,
//         commentType,
//       };
//     } else {
//       toBeAddedComment = {
//         subComment: newComment,
//         author: {
//           username: authorUsername,
//           userProfileImage: authorUserImage,
//         },
//         commentToId,
//         commentToUser: {
//           commentToUserId,
//         },
//       };
//       const commentType = 'subComment';
//       arg = {
//         newComment,
//         postId,
//         userId,
//         commentType,
//         commentToId,
//         commentToUserId,
//       };
//     }

//     const new = [...]
//     return mutate(uploadComment(arg));
//   };
// }
