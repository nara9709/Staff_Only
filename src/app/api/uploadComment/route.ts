import { addNewComment, addSubComment } from '@/service/post';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const {
    newComment,
    postId,
    userId,
    commentToId,
    commentToUserId,
    commentType,
  } = await req.json();

  console.log(
    `commentToId:${commentToId}, commentToUserId:${commentToUserId}, newComment:${newComment}, userId:${userId}`
  );

  // 요청 쿼리에 따라서 필요한 인자 정보 확인
  if (
    (commentType === 'comment' && !postId) ||
    (commentType === 'comment' && !newComment)
  ) {
    return new Response('Bad Request', { status: 400 });
  } else if (
    (commentType === 'subComment' && !commentToId) ||
    (commentType === 'subComment' && !commentToUserId)
  ) {
    return new Response('Bad Request', { status: 400 });
  }

  if (commentType === 'comment') {
    return addNewComment(postId, newComment, userId).then((data) =>
      NextResponse.json(data)
    );
  } else {
    return addSubComment(
      commentToId,
      commentToUserId,
      newComment,
      userId,
      postId
    ).then((data) => NextResponse.json(data));
  }
}
