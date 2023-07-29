import { GET, POST } from "./apis/apis";
import { API_ROUTES } from "../constants/routes";
import { generateUrl } from "../utils/common";
import { GetDayPlannerResponse } from "../types/dayPlanner.types";

export const getDayPlanner = (dateISO: string) => {
  const url = generateUrl(API_ROUTES.getDayPlanner, { dateISO });
  return GET<undefined, GetDayPlannerResponse>(url).then((data) => data.data);
};

export const getImpNote = (dayPlanId: string) => {
  const url = generateUrl(API_ROUTES.getImpNote, { dayPlanId: "" });
  return GET(url);
};
