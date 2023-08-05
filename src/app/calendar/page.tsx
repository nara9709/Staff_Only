import Calendars from '@/components/Calendars';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '근무시간 계산 달력',
  description: '근무시간 입력으로 이번달 월급을 확인해보세요',
};

async function CalendarPage() {
  return (
    <section>
      <h1 className="bg-white pt-7 pb-1 pl-6 font-thin text-left text-xl">
        당신의 <span className="text-[#176B87] font-bold">노력을 </span>
        기록해두세요😇
      </h1>
      <Calendars />
    </section>
  );
}

export default CalendarPage;
