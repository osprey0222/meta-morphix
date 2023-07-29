import { useMutation, useQuery } from "react-query";

import { getDayPlanner } from "../services/dayPlanner.services";
import { QUERY_KEYS } from "../constants/queryKeys";
import moment from "moment";

export const useGetDayPlanner = (dateISO: string) => {
  return useQuery(
    [QUERY_KEYS.GET_DAY_PLANNER, dateISO],
    () => getDayPlanner(dateISO),
    {
      placeholderData: {
        date: dateISO,
        timeTable: [
          {
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
