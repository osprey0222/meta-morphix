export interface TimeTable {
  complete: boolean;
  from: Date | string;
  to: Date | string;
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

export interface PatchImpNotePayload {
  data: { importantNote: string };
}

export interface PatchImpNoteResponse {
  data: string;
}
