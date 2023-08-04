import { CalendarDetail } from '@/model/calendar';
import React from 'react';

type Props = {
  days: CalendarDetail[];
  wage: number;
};

function ViewWorkingHour({ days, wage }: Props) {
  const calWorkingHour = () => {
    let month: number | string = new Date().getMonth() + 1;

    if (month <= 9) {
      month = 0 + month.toString();
    }

    const hours = days
      .filter((day) => day.fullDate.split('-')[1] == month)
      .reduce((sum, { workingHour }) => sum + workingHour, 0);

    return hours;
  };

  return (
    <div className="flex flex-col justify-center items-center p-3">
      <div className=" w-11/12 p-4 text-lg font-thin rounded-xl bg-white flex itmes-center justify-between py-6 px-6 ">
        <h1>📌 이번달 총 근무시간</h1>
        <p>
          <span className=" text-[#176B87] font-bold">{calWorkingHour()}</span>
          시간
        </p>
      </div>
      <div className="w-11/12 p-4 text-lg font-thin rounded-xl bg-white flex itmes-center justify-between py-6 px-6 mt-5 ">
        <h1>📌 이번달 예상 월급</h1>
        <p>
          <span className=" text-[#176B87] font-bold">
            {calWorkingHour() * wage}
          </span>{' '}
          원
        </p>
      </div>
    </div>
  );
}

export default ViewWorkingHour;
