import { client } from './sanity';
import { getUserByEmail } from './user';
import { DefaultUserInfo } from '@/model/user';

// 근무시간 데이터 가져오기
export async function getDataContainedDate(userEmail: string) {
  return client.fetch(
    `*[_type == "calendars" && author->email == "${userEmail}"][0]`
  );
}

// 근무시간 추가하기
export async function addWorkingDay(
  workingHour: number,
  startTime: string,
  endTime: string,
  day: string,
  userId: string,
  calendarId?: string
) {
  // 이미 유저 정보에 캘린더 정보가 있다면 근무시간만 추가
  if (calendarId) {
    return client
      .patch(calendarId)
      .setIfMissing({ days: [] })
      .append('days', [
        {
          fullDate: day,
          _type: 'day',
          startTime,
          endTime,
          workingHour,
        },
      ])
      .commit({ autoGenerateArrayKeys: true });
  } else {
    // 유저 정보에 캘린더 정보가 없다면 캘린더 생성 및 유저 정보에 캘린더 아이디 추가
    await client.create(
      {
        _type: 'calendars',
        author: {
          _ref: userId,
        },
        days: [
          {
            fullDate: day,
            _type: 'day',
            startTime,
            endTime,
            workingHour,
          },
        ],
      },
      { autoGenerateArrayKeys: true }
    );

    const calendarId = await client.fetch(
      `*[_type == "calendars" && author._ref == "${userId}"][0]{"id":_id}`
    );

    return client
      .patch(userId)
      .set({
        calendar: { _ref: calendarId.id, _type: 'reference' },
      })
      .commit();
  }
}
