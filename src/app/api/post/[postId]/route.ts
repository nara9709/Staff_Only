import { deletePost, getPostByPostId } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';
type Context = {
  params: {
    postId: string;
  };
};
export async function GET(_: NextRequest, context: Context) {
  const postId = context.params.postId;

  return getPostByPostId(postId).then((data) => NextResponse.json(data));
}

export async function DELETE(req: NextRequest) {
  const { postId } = await req.json();

  console.log(postId);

  if (!postId) {
    return new Response('Bad Request', { status: 500 });
  }

  return deletePost(postId).then((data) => NextResponse.json(data));
}
