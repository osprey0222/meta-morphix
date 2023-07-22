import moment from "moment";
import { TimeTableProps } from "../components/dashboard/DayPlanner/TimeTable";

export const timeTable: TimeTableProps["data"] = [
  {
    tag: { label: "Other", color: "grey.400" },
    from: new Date(), // new Date(),
    to: new Date(), //new Date(),
    info: "Get Up + walkGet Up + walkGet Up + walkGet Up + walkGet Up + walkGet Up + walk",
    complete: true,
  },
  {
    tag: { label: "Other", color: "grey.400" },
    from: new Date(), // "06:00",
    to: new Date(), //"07:00",
    info: "Breakfast + Bath",
  },
  {
    tag: { label: "LeetCode", color: "warning.light" },
    from: new Date(), // "07:00",
    to: new Date(), //"08:00",
    info: "LeetCode",
    complete: true,
  },
  {
    tag: { label: "LeetCode", color: "warning.light" },
    from: new Date(), // "08:00",
    to: new Date(), //"09:00",
    info: "LeetCode",
  },
  {
    tag: { label: "LeetCode", color: "warning.light" },
    from: new Date(), // "09:00",
    to: new Date(), //"10:00",
    info: "LeetCode",
    complete: true,
  },
  {
    tag: { label: "LeetCode", color: "warning.light" },
    from: new Date(), // "10:00",
    to: new Date(), //"11:00",
    info: "LeetCode",
    complete: true,
  },
  {
    tag: { label: "Office Hours", color: "info.light" },
    from: new Date(), // "11:00",
    to: new Date(), //"12:30",
    info: "OH",
  },
  {
    tag: { label: "Other", color: "grey.400" },
    from: new Date(), // "12:30",
    to: new Date(), //"14:00",
    info: "Break + Lunch",
  },
  {
    tag: { label: "Other", color: "grey.400" },
    from: new Date(), // "05:00",
    to: new Date(), //"06:00",
    info: "Get Up + walk",
  },
  {
    tag: { label: "Other", color: "grey.400" },
    from: new Date(), // "06:00",
    to: new Date(), //"07:00",
    info: "Breakfast + Bath",
  },
  {
    tag: { label: "LeetCode", color: "warning.light" },
    from: new Date(), // "07:00",
    to: new Date(), //"08:00",
    info: "LeetCode",
  },
  {
    tag: { label: "LeetCode", color: "warning.light" },
    from: new Date(), // "08:00",
    to: new Date(), //"09:00",
    info: "LeetCode",
  },
  {
    tag: { label: "LeetCode", color: "warning.light" },
    from: new Date(), // "09:00",
    to: new Date(), //"10:00",
    info: "LeetCode",
  },
  {
    tag: { label: "LeetCode", color: "warning.light" },
    from: new Date(), // "10:00",
    to: new Date(), //"11:00",
    info: "LeetCode",
    complete: true,
  },
  {
    tag: { label: "Other", color: "grey.400" },
    from: new Date(), // "11:00",
    to: new Date(), //"12:30",
    info: "OH",
    complete: true,
  },
  {
    tag: { label: "Other", color: "grey.400" },
    from: new Date(), // "12:30",
    to: new Date(), //"14:00",
    info: "Break + Lunch",
  },
];

export const tags: any = [
  {
    label: "LeetCode",
    color: "warning.light",
  },
  {
    label: "Office Hours",
    color: "info.light",
  },
  {
    label: "Other",
    color: "grey.400",
  },
  {
    label:
      "OtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOtherOther",
    color: "grey.400",
  },
];

export const colors: any = [
  "grey.400",
  "warning.light",
  "info.light",
  "success.light",
  "error.light",
  "primary.light",
  "secondary.light",
];
