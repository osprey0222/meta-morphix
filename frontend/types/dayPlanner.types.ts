export interface TimeTable {
  complete: boolean;
  from: Date;
  to: Date;
  info: string;
  tag?: { label: string; color: string };
  _id: string;
}

export interface DayPlanner {
  date: string;
  timeTable: TimeTable[];
  sides: string[];
  priorities: string[];
  importantNote: string;
  generalNote: string;
  id: string;
}

export interface GetDayPlannerResponse {
  data: DayPlanner;
}
