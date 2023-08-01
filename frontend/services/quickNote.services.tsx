import { API_ROUTES } from "../constants/routes";
import {
  GetQNResponse,
  UpdateQNPayload,
  UpdateQNResponse,
} from "../types/quickNote.types";
import { generateUrl } from "../utils/common";
import { GET, PATCH } from "./apis/apis";

export const getQuickNote = () => {
  const url = API_ROUTES.getQN;
  return GET<undefined, GetQNResponse>(url).then((data) => data.data);
};

export const updateQuickNote = (dateISO: string, payload: UpdateQNPayload) => {
  const url = generateUrl(API_ROUTES.updateQN, { dateISO });
  return PATCH<UpdateQNPayload, UpdateQNResponse>(url, payload).then(
    (data) => data.data
  );
};
