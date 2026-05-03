import { Button } from "@components/ui/button";
import { cn } from "@src/lib/utils";
import { DAYS, getDaysInMonth, isSameDate } from "./utils";

export function DateGrid({ month, year, mode, value, onSelectDate }) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(month, year);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  const prevMonthDays = getDaysInMonth(prevMonth, prevYear);
  const prevDates = Array.from(
    { length: firstDay },
    (_, i) => prevMonthDays - firstDay + i + 1,
  );

  const currentDates = Array.from({ length: totalDays }, (_, i) => i + 1);

  const totalCells = 42;
  const nextDatesLength = totalCells - prevDates.length - currentDates.length;
  const nextDates = Array.from({ length: nextDatesLength }, (_, i) => i + 1);

  const dates = [
    ...prevDates.map((day) => ({
      day,
      month: prevMonth,
      year: prevYear,
      isOutside: true,
    })),
    ...currentDates.map((day) => ({
      day,
      month,
      year,
      isOutside: false,
    })),
    ...nextDates.map((day) => ({
      day,
      month: nextMonth,
      year: nextYear,
      isOutside: true,
    })),
  ];

  function getDate(item) {
    return new Date(item.year, item.month, item.day);
  }

  function isSelected(item) {
    const date = getDate(item);

    if (mode === "single") {
      return isSameDate(value, date);
    }

    return isSameDate(value?.from, date) || isSameDate(value?.to, date);
  }

  function isInRange(item) {
    if (mode !== "range" || !value?.from || !value?.to) return false;

    const date = getDate(item);
    return date > value.from && date < value.to;
  }

  function handleSelect(item) {
    onSelectDate(getDate(item));
  }

  return (
    <>
      <div className="text-muted-foreground mb-1.5 grid grid-cols-7 text-center text-[11px] font-medium sm:text-xs">
        {DAYS.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {dates.map((item) => (
          <Button
            key={`${item.year}-${item.month}-${item.day}`}
            type="button"
            variant={isSelected(item) ? "default" : "ghost"}
            className={cn(
              "mx-auto size-7 cursor-pointer rounded-sm p-0 text-xs sm:rounded-md sm:text-sm",
              item.isOutside && "text-muted-foreground/40",
              isInRange(item) && "bg-accent text-accent-foreground",
              isInRange(item) && item.isOutside && "text-accent-foreground/60",
            )}
            onClick={() => handleSelect(item)}
          >
            {item.day}
          </Button>
        ))}
      </div>
    </>
  );
}
