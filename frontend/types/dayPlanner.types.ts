export type DateISO = `${number}-${number}-${number}`;

export type DateTimeISO = `${number}-${number}-${number}${number}:${number}`;

export interface TimeTable {
  complete: boolean;
  from: Date | DateTimeISO | string;
  to: Date | DateTimeISO | string;
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

export interface PatchSidesPayload {
  data: { sides: string[] };
}

export interface PatchSidesResponse {
  data: string;
}

export interface PatchPrioritiesPayload {
  data: { priorities: string[] };
}

export interface PatchPrioritiesResponse {
  data: string;
}
