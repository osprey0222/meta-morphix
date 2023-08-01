import moment from "moment";
import { DateISO } from "../types/dayPlanner.types";

export const getStringifiedHistory = (data: { [key: DateISO]: string }) => {
  const sorted_keys = Object.keys(data).sort((a, b) =>
    new Date(a) > new Date(b) ? 0 : -1
  );

  let updatedData = "";
  sorted_keys.forEach((key: string) => {
    updatedData += data[key]
      ? `\n${moment(key).format("DD MMMM YYYY")}:\n\n${data[key]}\n\n`
      : "";
  });

  return updatedData;
};
