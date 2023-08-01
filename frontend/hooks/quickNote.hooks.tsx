import { useMutation, useQuery } from "react-query";

import { QUERY_KEYS } from "../constants/queryKeys";
import moment from "moment";
import { DateISO, PatchTTPayload } from "../types/dayPlanner.types";
import { getQuickNote, updateQuickNote } from "../services/quickNote.services";
import { UpdateQNPayload } from "../types/quickNote.types";

export const useGetQN = () => {
  const { data } = useQuery([QUERY_KEYS.GET_QUICK_NOTE], () => getQuickNote(), {
    placeholderData: {},
  });

  const sorted_keys = Object.keys(data).sort((a, b) =>
    new Date(a) > new Date(b) ? -1 : 0
  );

  let updatedData = "";
  sorted_keys.forEach((key: string) => {
    updatedData += `\n${moment(key).format("DD MMMM YYYY")}:\n\n${
      data[key]
    }\n\n`;
  });

  return { data: updatedData };
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
