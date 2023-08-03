import Calendars from '@/components/Calendars';
import React from 'react';

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
