import { GET, POST } from "./apis/apis";
import { API_ROUTES } from "../constants/routes";
import { generateUrl } from "../utils/common";

export const getImpNote = (dayPlanId: string) => {
  const url = generateUrl(API_ROUTES.getImpNote, { dayPlanId: "" });
  return GET(url);
};
