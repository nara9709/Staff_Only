import { addWorkingDay } from '@/service/calendar';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', {
      status: 401,
    });
  }

  const { day, workingHour, startTime, endTime, userId, calendarId } =
    await req.json();

  console.log(day, workingHour, startTime, endTime, userId, calendarId);

  if (!day || !workingHour || !userId || !startTime || !endTime) {
    return new Response('Bad Request', {
      status: 400,
    });
  }

  return addWorkingDay(
    workingHour,
    startTime,
    endTime,
    day,
    userId,
    calendarId
  ).then((data) => NextResponse.json(data));
}
