'use client';
import React, { useState } from 'react';
import { DayValue } from './Calendars';
import { BiSave } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IconButton } from '@mui/material';

type Props = {
  onClose: () => void;
  onSubmit: (startTime: string, endTime: string, workingHour: number) => void;
};

function CalendarModal({ onSubmit, onClose }: Props) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // 출근시간과 퇴근시간을 이용해서 근무시간 계산하기
  const calTotalWorkingHours = () => {
    const [startHour, startMin] = splitTimeValue(startTime);
    const [endHour, endMin] = splitTimeValue(endTime);
    const startTotalMin = parseInt(startHour) * 60 + parseInt(startMin);
    const endTotalMin = parseInt(endHour) * 60 + parseInt(endMin);

    const result = endTotalMin - startTotalMin;
    const hour = Math.trunc(result / 60);
    const min = Number(((result - hour * 60) / 60).toFixed(1));

    const workingHour = hour + min;

    return onSubmit(startTime, endTime, workingHour);
  };

  const splitTimeValue = (timeValue: string): string[] => {
    return timeValue.split(':');
  };

  return (
    <div className=" bg-[#176B87] w-full h-full fixed top-[50%] rounded-lg max-w-7xl m-auto p-2">
      <form className="flex flex-col pt-8 px-8 pb-4 relative">
        <span className=" absolute right-0 top-0">
          <IconButton>
            <AiOutlineCloseCircle
              className={iconStyle}
              onClick={onClose}
              fill="white"
            />
          </IconButton>
        </span>
        <label className=" text-white mb-2 text-lg font-thin">출근시간</label>
        <input
          type="time"
          id="startTime"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
          className=" rounded-md p-[0.3rem] mb-2 focus:outline-none w-full
           "
        />
        <label className="text-white mb-2 text-lg font-thin">퇴근시간</label>
        <input
          type="time"
          id="endTime"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
          className=" rounded-md p-[0.3rem] w-full focus:outline-none "
        />
        <span className="mt-2 text-center">
          <IconButton onClick={() => calTotalWorkingHours()}>
            <BiSave fill="white" className={iconStyle} />
          </IconButton>
        </span>
      </form>
    </div>
  );
}

export default CalendarModal;

const iconStyle = 'w-10 h-10 md:w-10 md:h-10 ';
