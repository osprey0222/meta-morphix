import { useMutation, useQuery } from "react-query";

import {
  getDayPlanner,
  updateImpNote,
  updatePriorities,
  updateSides,
} from "../services/dayPlanner.services";
import { QUERY_KEYS } from "../constants/queryKeys";
import moment from "moment";
import {
  DateISO,
  PatchImpNotePayload,
  PatchPrioritiesPayload,
  PatchSidesPayload,
} from "../types/dayPlanner.types";

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
      dateISO,
      payload,
      callback,
    }: {
      dateISO: DateISO;
      payload: PatchImpNotePayload;
      callback?: (p: string) => void;
    }) => {
      return updateImpNote(dateISO, payload);
    },
    {
      onSuccess: (data, variables) => {
        variables.callback(variables.payload.data.importantNote);
      },
      onError: (data, variables) => {},
    }
  );
};

export const useUpdateSides = () => {
  return useMutation(
    ({
      dateISO,
      payload,
      callback,
    }: {
      dateISO: DateISO;
      payload: PatchSidesPayload;
      callback?: (p: string) => void;
    }) => {
      return updateSides(dateISO, payload);
    },
    {
      onSuccess: (data, variables) => {},
      onError: (data, variables) => {},
    }
  );
};

export const useUpdatePriorities = () => {
  return useMutation(
    ({
      dateISO,
      payload,
      callback,
    }: {
      dateISO: DateISO;
      payload: PatchPrioritiesPayload;
      callback?: (p: string) => void;
    }) => {
      return updatePriorities(dateISO, payload);
    },
    {
      onSuccess: (data, variables) => {},
      onError: (data, variables) => {},
    }
  );
};

export const useUpdateTT = () => {
  return useMutation(
    ({
      dateISO,
      payload,
      callback,
    }: {
      dateISO: DateISO;
      payload: PatchPrioritiesPayload;
      callback?: (p: string) => void;
    }) => {
      return updatePriorities(dateISO, payload);
    },
    {
      onSuccess: (data, variables) => {},
      onError: (data, variables) => {},
    }
  );
};
