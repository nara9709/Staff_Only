export type DefaultCalendar = {
  days: CalendarDetail[];
};

export type CalendarDetail = {
  key: string;
  workingHour: number;
  fullDate: string;
  startTime: string;
  endTime: string;
};
