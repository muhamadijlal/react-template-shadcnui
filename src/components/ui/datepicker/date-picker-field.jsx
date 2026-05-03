import { useId, useMemo } from "react";
import { IoIosWarning } from "react-icons/io";

import { cn } from "@src/lib/utils";
import { Button } from "@components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@components/ui/field";

import { DatePickerPopover } from "./date-picker-popover";
import { formatDate } from "./utils";
import { BsCalendarEventFill, BsCalendarRangeFill } from "react-icons/bs";

export function DatePickerField({
  label,
  descriptions,
  placeholder = "Pilih tanggal",
  error,
  message,
  disabled,
  required,
  mode = "single",
  value,
  onChange,
}) {
  const id = useId();

  const selectedLabel = useMemo(() => {
    if (mode === "range") {
      console.log(value);
      if (value?.from && value?.to) {
        return `${formatDate(value.from)} - ${formatDate(value.to)}`;
      }

      if (value?.from) {
        return `${formatDate(value.from)} -`;
      }

      return "";
    }

    return formatDate(value);
  }, [value, mode]);

  return (
    <Field data-disabled={disabled} data-invalid={error}>
      {label && (
        <FieldLabel htmlFor={id}>
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      <DatePickerPopover mode={mode} value={value} onChange={onChange}>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-invalid={error}
          className={cn(
            "h-9 w-full justify-between bg-white px-3 text-sm font-normal sm:h-10",
            !selectedLabel && "text-muted-foreground",
            error && "border-destructive",
          )}
        >
          <span className="truncate">{selectedLabel || placeholder}</span>
          {mode === "single" ? (
            <BsCalendarEventFill className="text-muted-foreground ml-2 size-4 shrink-0" />
          ) : (
            <BsCalendarRangeFill className="text-muted-foreground ml-2 size-4 shrink-0" />
          )}
        </Button>
      </DatePickerPopover>

      {error && message && (
        <span className="text-destructive inline-flex items-center gap-1 text-sm">
          <IoIosWarning className="text-lg" /> {message}
        </span>
      )}

      {descriptions && <FieldDescription>{descriptions}</FieldDescription>}
    </Field>
  );
}
