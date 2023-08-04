import { getUserByEmail, updateProfile } from '@/service/user';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }
  return getUserByEmail(user.email) //
    .then((data) => NextResponse.json(data));
}
export async function PUT(req: NextRequest) {
  const { username, wage, userId } = await req.json();

  return updateProfile(username, wage, userId).then((data) =>
    NextResponse.json(data)
  );
}
