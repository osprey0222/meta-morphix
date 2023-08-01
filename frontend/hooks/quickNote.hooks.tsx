import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "../constants/queryKeys";
import moment from "moment";
import { DateISO } from "../types/dayPlanner.types";
import { getQuickNote, updateQuickNote } from "../services/quickNote.services";
import { UpdateQNPayload } from "../types/quickNote.types";

export const useGetQN = () => {
  return useQuery([QUERY_KEYS.GET_QUICK_NOTE], () => getQuickNote(), {
    placeholderData: {},
  });
};

export const useUpdateQN = () => {
  return useMutation(
    ({
      dateISO,
      payload,
      callback,
    }: {
      dateISO: DateISO;
      payload: UpdateQNPayload;
      callback?: (p: string) => void;
    }) => updateQuickNote(dateISO, payload),
    {
      onSuccess: (data, variables) => {},
      onError: (data, variables) => {},
    }
  );
};
