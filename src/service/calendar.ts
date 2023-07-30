import { client } from './sanity';
import { getUserByEmail } from './user';
import { DefaultUserInfo } from '@/model/user';

export async function getDataContainedDate(userEmail: string) {
  return client.fetch(
    `*[_type == "calendars" && author->email == "${userEmail}"][0]`
  );
}

//TODO
// 1.유저 정보를 가져와서 유저정보에 캘린더 아이디가 들어가 있는지 확인
//2.캘린더 정보가 없다면 캘린더를 만들어서 해당 아이디를 유저의 캘린더 아이디에 넣어준다.
//3.캘린더 정보가 있다면 해당 캘린더 내용만 업데이트 해줌

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
  }
}
