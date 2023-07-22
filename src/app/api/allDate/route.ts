import { getDataContainedDate } from '@/service/calendar';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || user.email == null) {
    return new Response('Authentication Error', { status: 404 });
  }

  return getDataContainedDate(user.email).then((data) =>
    NextResponse.json(data)
  );
}
