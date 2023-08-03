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
    // TODO
    // 1. create 사용해서 새로운 캘린더 생성, 생성하면서 근무 시간 추가해주기
    // 2. 해당 캘린더 author의 ref로 userId 넣어주기
    //3. 캘린더의 author가 해당 userId인 캘린더의 id를 가져와서 user의 calendar ref로 해당 calendar id 넣어주기
  }
}
