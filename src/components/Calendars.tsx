'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createPortal } from 'react-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import CalendarModal from './CalendarModal';
import useSWR from 'swr';
import moment from 'moment';
import CalendarCalInfo from './CalendarCalInfo';
import { DefaultCalendar } from '@/model/calendar';
import { Fade } from '@mui/material';

type ValuePiece = Date | null | string;
export type DayValue = ValuePiece | [ValuePiece, ValuePiece];

function Calendars() {
  const [showModal, setShowModal] = useState(false);
  const [DayValue, onChange] = useState<DayValue>(new Date().toISOString());

  const { data } = useSWR<DefaultCalendar>('/api/allDate');
  const days = data?.days ? data.days.map((day) => day.fullDate) : [];

  return (
    <>
      <div className="w-full h-[600px] ">
        <Calendar
          onChange={onChange}
          value={DayValue}
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
          <CalendarModal date={DayValue} onClose={() => setShowModal(false)} />,
          document.getElementById('portal')!
        )}
    </>
  );
}

export default Calendars;
