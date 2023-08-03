import moment from "moment";

export const getFormattedDate = (date: any) => {
  return moment(date).format("YYYY-MM-DD");
};
