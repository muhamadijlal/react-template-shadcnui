import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@components/ui/button";
import { MONTHS } from "./utils";
import { cn } from "@src/lib/utils";

export function DatePickerHeader({
  month,
  year,
  view,
  onPrev,
  onNext,
  onMonthClick,
  onYearClick,
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 cursor-pointer"
        onClick={onPrev}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <div className="flex min-w-0 flex-1 justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onMonthClick}
          className={cn(
            "h-8 min-w-10 cursor-pointer bg-white text-xs shadow-none sm:text-sm",
            view === "month" && "border-primary bg-primary text-white",
          )}
        >
          {MONTHS[month]}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onYearClick}
          className={cn(
            "h-8 min-w-10 cursor-pointer bg-white text-xs shadow-none sm:text-sm",
            view === "year" && "border-primary bg-primary text-white",
          )}
        >
          {year}
        </Button>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 cursor-pointer"
        onClick={onNext}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
