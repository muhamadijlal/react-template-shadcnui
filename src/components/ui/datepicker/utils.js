import { format, isSameDay } from "date-fns";
import { id } from "date-fns/locale";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export function formatDate(date) {
  // format date to string with format "dd MMMM yyyy" and locale "id"
  if (!date) return "";

  return format(date, "dd MMMM yyyy", { locale: id });
}

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function isSameDate(a, b) {
  if (!a || !b) return false;
  return isSameDay(a, b);
}
