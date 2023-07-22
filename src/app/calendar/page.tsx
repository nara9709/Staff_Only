import Calendar from '@/components/Calendars';
import React from 'react';

async function CalendarPage() {
  return (
    <section>
      <h1 className="bg-white pt-7 pb-5 pl-2 font-bold text-left text-lg">
        당신의 노력을 기록해두세요😇
      </h1>
      <Calendar />
    </section>
  );
}

export default CalendarPage;
