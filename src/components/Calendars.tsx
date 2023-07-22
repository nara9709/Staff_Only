'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createPortal } from 'react-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import CalendarModal from './CalendarModal';
import useSWR from 'swr';
import moment from 'moment';

type ValuePiece = Date | null | string;
export type DayValue = ValuePiece | [ValuePiece, ValuePiece];

type DaysType = {
  days: string[];
};

function Calendars() {
  const [showModal, setShowModal] = useState(false);
  const [DayValue, onChange] = useState<DayValue>(new Date().toISOString());
  const portalElement = document.getElementById('portal')!;

  const { data } = useSWR<DaysType>('/api/allDate');

  console.log(data);

  return (
    <>
      <section className="w-full h-[600px] ">
        <h1 className="bg-white pt-7 pb-5 pl-2 font-bold text-left text-lg">
          당신의 노력을 기록해두세요😇
        </h1>

        <Calendar
          onChange={onChange}
          value={DayValue}
          onClickDay={() => console.log('click!')}
          tileContent={
            data &&
            data.days.length > 0 &&
            (({ date, view }) => {
              if (
                data.days.find(
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
          className=" bg-blue-950 w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => setShowModal(true)}
        >
          <AiOutlinePlus fill="white" className=" w-7 h-7 m-auto" />
        </div>
      </section>
      {/* plus 버튼을 추가하면 시간 기입을 위한 모달창을 보여줌 */}
      {showModal &&
        createPortal(
          <CalendarModal date={DayValue} onClose={() => setShowModal(false)} />,
          portalElement
        )}
    </>
  );
}

export default Calendars;
