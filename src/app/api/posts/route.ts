import { createPost } from '@/service/post';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const form = await req.formData();
  const content = form.get('content')?.toString();
  const subject = form.get('subject')?.toString();
  const category = form.get('category')?.toString();
  const file = form.get('file') as Blob;
  const userId = form.get('userId')?.toString() ?? '';

  if (!content || !subject || !category) {
    return new Response('Bad Request', { status: 400 });
  }
  return await createPost(userId, content, subject, category, file).then(
    (data) => NextResponse.json(data)
  );
}
