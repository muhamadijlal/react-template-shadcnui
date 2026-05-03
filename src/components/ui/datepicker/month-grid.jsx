import { Button } from "@components/ui/button";
import { MONTHS } from "./utils";

export function MonthGrid({ month, onSelectMonth }) {
  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-3">
      {MONTHS.map((item, index) => (
        <Button
          key={item}
          type="button"
          variant={month === index ? "default" : "ghost"}
          className="h-10 cursor-pointer rounded-md text-xs sm:h-11"
          onClick={() => onSelectMonth(index)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
