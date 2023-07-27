import { deleteComment } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const { postId, commentId, commentType } = await req.json();

  if (!postId || !commentId || !commentType) {
    return new Response('Bad Request', { status: 400 });
  }

  return deleteComment(postId, commentId, commentType).then((data) =>
    NextResponse.json(data)
  );
}
