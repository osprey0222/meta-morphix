import { useMutation, useQuery } from "react-query";

import { getDayPlanner, updateImpNote } from "../services/dayPlanner.services";
import { QUERY_KEYS } from "../constants/queryKeys";
import moment from "moment";
import { PatchImpNotePayload } from "../types/dayPlanner.types";

export const useGetDayPlanner = (dateISO: string) => {
  return useQuery(
    [QUERY_KEYS.GET_DAY_PLANNER, dateISO],
    () => getDayPlanner(dateISO),
    {
      placeholderData: {
        date: dateISO,
        timeTable: [
          {
            _id: null,
            to: moment(dateISO + "08:00", "YYYY-MM-DDHH:mm").toISOString(),
            from: moment(dateISO + "09:00", "YYYY-MM-DDHH:mm").toISOString(),
            info: "",
            complete: false,
          },
        ],
        sides: ["", "", ""],
        priorities: ["", "", ""],
        importantNote: "",
        generalNote: "",
        id: "",
      },
      enabled: Boolean(dateISO),
    }
  );
};

export const useUpdateImpNote = () => {
  return useMutation(
    ({
      dayPlanId,
      payload,
      callback,
    }: {
      dayPlanId: string;
      payload: PatchImpNotePayload;
      callback?: (p: string) => void;
    }) => {
      return updateImpNote(dayPlanId, payload);
    },
    {
      onSuccess: (data, variables) => {
        variables.callback(variables.payload.data.importantNote);
      },
      onError: (data, variables) => {},
    }
  );
};
