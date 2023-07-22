export type DefaultCalendar = {
  days: CalendarDetail[];
};

export type CalendarDetail = {
  key: string;
  workingHours: number;
  fullDate: string;
  startTime: string;
  endTime: string;
};
