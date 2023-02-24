import { subMonths } from "date-fns";
import { FilterOption } from "./types";

export const filterOptions: FilterOption[] = [
  { label: "ALL", range: { min: new Date(0), max: new Date() }, timeUnit: "year" },
  {
    label: "YTD",
    range: { min: new Date(new Date().getFullYear(), 0, 1), max: new Date() },
    timeUnit: new Date().getMonth() > 4 ? "month" : "day"
  },
  { label: "12M", range: { min: subMonths(new Date(), 12), max: new Date() }, timeUnit: "month" },
  { label: "3M", range: { min: subMonths(new Date(), 3), max: new Date() }, timeUnit: "day" },
  { label: "1M", range: { min: subMonths(new Date(), 1), max: new Date() }, timeUnit: "day" }
];

// some random colors
export const colors = ["#27ae60", "#2980b9", "#9b59b6", "#e74c3c", "#f1c40f", "#95a5a6"];
