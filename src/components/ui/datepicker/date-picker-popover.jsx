import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { DatePickerHeader } from "./date-picker-header";
import { DateGrid } from "./date-grid";
import { MonthGrid } from "./month-grid";
import { YearGrid } from "./year-grid";

export function DatePickerPopover({
  children,
  mode = "single",
  value,
  onChange,
}) {
  const initialDate =
    mode === "range" ? value?.from || new Date() : value || new Date();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState("date");
  const [month, setMonth] = useState(initialDate.getMonth());
  const [year, setYear] = useState(initialDate.getFullYear());

  function handlePrev() {
    if (view === "date") {
      if (month === 0) {
        setMonth(11);
        setYear((prev) => prev - 1);
      } else {
        setMonth((prev) => prev - 1);
      }
    }

    if (view === "month") setYear((prev) => prev - 1);
    if (view === "year") setYear((prev) => prev - 12);
  }

  function handleNext() {
    if (view === "date") {
      if (month === 11) {
        setMonth(0);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }
    }

    if (view === "month") setYear((prev) => prev + 1);
    if (view === "year") setYear((prev) => prev + 12);
  }

  function handleSelectDate(selected) {
    setMonth(selected.getMonth());
    setYear(selected.getFullYear());

    if (mode === "single") {
      onChange?.(selected);
      setOpen(false);
      return;
    }

    if (!value?.from || value?.to) {
      onChange?.({ from: selected, to: undefined });
      return;
    }

    if (selected < value.from) {
      onChange?.({ from: selected, to: value.from });
    } else {
      onChange?.({ from: value.from, to: selected });
      setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger aschild="true">{children}</PopoverTrigger>

      <PopoverContent
        className="w-full max-w-62 gap-0 rounded-lg p-3 shadow-none sm:max-w-[320px]"
        align="start"
      >
        <DatePickerHeader
          month={month}
          year={year}
          view={view}
          onPrev={handlePrev}
          onNext={handleNext}
          onMonthClick={() => setView("month")}
          onYearClick={() => setView("year")}
        />
        {view === "date" && (
          <DateGrid
            month={month}
            year={year}
            mode={mode}
            value={value}
            onSelectDate={handleSelectDate}
          />
        )}
        {view === "month" && (
          <MonthGrid
            month={month}
            onSelectMonth={(selectedMonth) => {
              setMonth(selectedMonth);
              setView("date");
            }}
          />
        )}
        {view === "year" && (
          <YearGrid
            year={year}
            onSelectYear={(selectedYear) => {
              setYear(selectedYear);
              setView("date");
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
