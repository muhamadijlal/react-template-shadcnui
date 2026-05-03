import { Button } from "@components/ui/button";

export function YearGrid({ year, onSelectYear }) {
  const yearStart = Math.floor(year / 12) * 12;
  const years = Array.from({ length: 12 }, (_, i) => yearStart + i);

  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-3">
      {years.map((item) => (
        <Button
          key={item}
          type="button"
          variant={year === item ? "default" : "ghost"}
          className="h-10 cursor-pointer rounded-md text-xs sm:h-11"
          onClick={() => onSelectYear(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
