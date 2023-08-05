import { getBookmarkedPosts } from '@/service/post';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  if (!params.userId) {
    return new Response('Bad Reqeust', { status: 404 });
  }

  return getBookmarkedPosts(params.userId).then((data) =>
    NextResponse.json(data)
  );
}
