'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createPortal } from 'react-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import CalendarModal from './CalendarModal';
import useSWR, { useSWRConfig } from 'swr';
import moment from 'moment';
import CalendarCalInfo from './CalendarCalInfo';
import { DefaultCalendar } from '@/model/calendar';
import { Fade } from '@mui/material';
import useMe from '@/hooks/useMe';
import { useRouter } from 'next/navigation';

type ValuePiece = Date | null | string;
export type DayValue = ValuePiece | [ValuePiece, ValuePiece];

function Calendars() {
  const [showModal, setShowModal] = useState(false);
  const [dayValue, onChange] = useState<DayValue>(new Date().toISOString());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { data, mutate } = useSWR<DefaultCalendar>('/api/allDate');
  const days = data?.days ? data.days.map((day) => day.fullDate) : [];

  const { user } = useMe();
  const { mutate: globalMutate } = useSWRConfig();
  const router = useRouter();

  // 새로운 근무시간 업로드
  const handdleSubmit = (
    startTime: string,
    endTime: string,
    workingHour: number
  ) => {
    setIsLoading(true);

    // 날짜 포맷 변경

    if (!dayValue) {
      return new Error('날짜를 선택해주세요');
    }

    const rawDay = dayValue?.toString().split('00');

    const editedDay = new Date(rawDay[0]).toISOString();

    const day = editedDay.split('T')[0];

    fetch('/api/calendar', {
      method: 'POST',
      body: JSON.stringify({
        day,
        startTime,
        endTime,
        workingHour,
        userId: user?.id,
        calendarId: user?.calendar,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        globalMutate('/api/allDate');
      })
      .then(() => router.refresh())
      .then(() => setShowModal(false))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="w-full h-[600px] ">
        <Calendar
          onChange={onChange}
          value={dayValue}
          onClickDay={() => console.log('click!')}
          tileContent={
            data &&
            days.length > 0 &&
            (({ date, view }) => {
              if (
                days.find(
                  (x: string) => x === moment(date).format('YYYY-MM-DD')
                )
              ) {
                return (
                  <>
                    <div className="flex justify-center items-center absoluteDiv">
                      <div
                        id="dot"
                        className="h-2 w-2 bg-red-400 rounded-full mt-1"
                      ></div>
                    </div>
                  </>
                );
              }
            })
          }
        />

        <div
          className=" bg-blue-950 w-12 h-12 rounded-full flex items-center justify-center fixed right-2 bottom-24"
          onClick={() => setShowModal(true)}
        >
          <AiOutlinePlus fill="white" className=" w-7 h-7 m-auto" />
        </div>
        <CalendarCalInfo />
      </div>

      {/* plus 버튼을 추가하면 시간 기입을 위한 모달창을 보여줌 */}
      {showModal &&
        typeof window === 'object' &&
        createPortal(
          <CalendarModal
            onSubmit={handdleSubmit}
            onClose={() => setShowModal(false)}
          />,
          document.getElementById('portal')!
        )}
    </>
  );
}

export default Calendars;
