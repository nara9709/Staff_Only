import { getCommentsByPostId } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';
type Context = {
  params: {
    postId: string;
  };
};
export async function GET(_: NextRequest, context: Context) {
  const postId = context.params.postId;
  return getCommentsByPostId(postId).then((data) => NextResponse.json(data));
}
