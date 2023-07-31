import { GET, PATCH, POST } from "./apis/apis";
import { API_ROUTES } from "../constants/routes";
import { generateUrl } from "../utils/common";
import {
  DateISO,
  GetDayPlannerResponse,
  PatchImpNotePayload,
  PatchImpNoteResponse,
  PatchPrioritiesPayload,
  PatchPrioritiesResponse,
  PatchSidesPayload,
  PatchSidesResponse,
} from "../types/dayPlanner.types";

export const getDayPlanner = (dateISO: string) => {
  const url = generateUrl(API_ROUTES.getDayPlanner, { dateISO });
  return GET<undefined, GetDayPlannerResponse>(url).then((data) => data.data);
};

export const updateImpNote = (
  dateISO: DateISO,
  payload: PatchImpNotePayload
) => {
  const url = generateUrl(API_ROUTES.updateImpNote, { dateISO });
  return PATCH<PatchImpNotePayload, PatchImpNoteResponse>(url, payload).then(
    (res) => res.data
  );
};

export const updateSides = (dateISO: DateISO, payload: PatchSidesPayload) => {
  const url = generateUrl(API_ROUTES.updateSides, { dateISO });
  return PATCH<PatchSidesPayload, PatchSidesResponse>(url, payload).then(
    (res) => res.data
  );
};

export const updatePriorities = (
  dateISO: DateISO,
  payload: PatchPrioritiesPayload
) => {
  const url = generateUrl(API_ROUTES.updatePriorities, { dateISO });
  return PATCH<PatchPrioritiesPayload, PatchPrioritiesResponse>(
    url,
    payload
  ).then((res) => res.data);
};

export const getImpNote = (dayPlanId: string) => {
  const url = generateUrl(API_ROUTES.getImpNote, { dayPlanId: "" });
  return GET(url);
};
