'use client';
import React, { useState } from 'react';
import { DayValue } from './Calendars';
import { BiSave } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IconButton } from '@mui/material';

type Props = {
  date: DayValue;
  onClose: () => void;
};

function CalendarModal({ date, onClose }: Props) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const iconStyle = 'w-8 h-8 md:w-10 md:h-10';

  // 출근시간과 퇴근시간을 이용해서 근무시간 계산하기
  const calTotalWorkingHours = () => {
    const [startHour, startMin] = splitTimeValue(startTime);
    const [endHour, endMin] = splitTimeValue(endTime);
    const startTotalMin = parseInt(startHour) * 60 + parseInt(startMin);
    const endTotalMin = parseInt(endHour) * 60 + parseInt(endMin);

    const result = endTotalMin - startTotalMin;
    const hour = Math.trunc(result / 60);
    const min = result - hour * 60;

    return {
      hour,
      min,
    };
  };

  const splitTimeValue = (timeValue: string): string[] => {
    return timeValue.split(':');
  };

  return (
    <div className=" bg-blue-100 w-full h-full fixed top-[60%] rounded-lg">
      <span className="fixed right-0">
        <IconButton>
          <AiOutlineCloseCircle className={iconStyle} onClick={onClose} />
        </IconButton>
      </span>

      <form className="flex flex-col pt-8 px-8 pb-4">
        <label className="mb-1">출근시간</label>
        <input
          type="time"
          id="startTime"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
          className=" rounded-md p-[0.3rem] mb-2"
        />
        <label className="mb-1">퇴근시간</label>
        <input
          type="time"
          id="endTime"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
          className=" rounded-md p-[0.3rem]"
        />
        <span className="mt-2 text-center">
          <IconButton onClick={() => calTotalWorkingHours()}>
            <BiSave className={iconStyle} />
          </IconButton>
        </span>
      </form>
    </div>
  );
}

export default CalendarModal;
