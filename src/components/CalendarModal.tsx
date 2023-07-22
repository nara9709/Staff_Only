'use client';
import React, { useState } from 'react';
import { DayValue } from './Calendars';

type Props = {
  date: DayValue;
  onClose: () => void;
};

function CalendarModal({ date, onClose }: Props) {
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
    <div className="bg-white">
      dialog
      <form>
        <label>출근시간</label>
        <input
          type="time"
          id="startTime"
          onChange={(e) => setStartTime(e.target.value)}
          value={startTime}
        />
        <label>퇴근시간</label>
        <input
          type="time"
          id="endTime"
          onChange={(e) => setEndTime(e.target.value)}
          value={endTime}
        />
      </form>
      <button onClick={() => console.log(calTotalWorkingHours())}>계산</button>
    </div>
  );
}

export default CalendarModal;
