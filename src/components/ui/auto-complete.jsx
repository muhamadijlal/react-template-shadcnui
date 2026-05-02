"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@components/ui/field";
import { IoIosWarning } from "react-icons/io";

export function AutoComplete({
  multiple = false,
  options = [],
  value,
  onChange,
  textNotFound = "No items found.",
  placeholder = "Pilih item",
  label,
  required = false,
  description,
  error = false,
  message,
  disabled = false,
}) {
  const id = React.useId();
  const anchor = useComboboxAnchor();

  const singleInputRef = React.useRef(null);
  const multipleInputRef = React.useRef(null);

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const normalizedValue = React.useMemo(() => {
    if (value == null || value === "") {
      return multiple ? [] : "";
    }

    if (multiple) {
      return Array.isArray(value)
        ? value.filter(Boolean)
        : [value].filter(Boolean);
    }

    return Array.isArray(value) ? (value[0] ?? "") : value;
  }, [value, multiple]);

  const optionMap = React.useMemo(() => {
    return new Map(options.map((item) => [item.value, item.label]));
  }, [options]);

  const itemValues = React.useMemo(() => {
    return options.map((item) => item.value);
  }, [options]);

  React.useEffect(() => {
    if (!multiple) {
      const selectedLabel = optionMap.get(normalizedValue) ?? "";
      setInputValue(selectedLabel);
    }
  }, [multiple, normalizedValue, optionMap]);

  const clearMultipleSearch = () => {
    setTimeout(() => {
      const input = multipleInputRef.current;
      if (!input) return;

      input.value = "";

      input.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          inputType: "deleteContentBackward",
          data: null,
        }),
      );
    }, 0);
  };

  const forceCloseSingle = () => {
    setOpen(false);

    setTimeout(() => {
      singleInputRef.current?.blur?.();
      document.activeElement?.blur?.();
    }, 0);
  };

  return (
    <Field data-disabled={disabled} data-invalid={error}>
      {label && (
        <FieldLabel htmlFor={id}>
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      <Combobox
        multiple={multiple}
        autoHighlight
        items={itemValues}
        value={normalizedValue}
        onValueChange={(nextValue) => {
          onChange?.(nextValue);
        }}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
      >
        <ComboboxChips
          ref={anchor}
          className="h-9 w-full rounded-md border"
          aria-invalid={error}
          onClick={() => {
            if (!disabled) setOpen(true);
          }}
        >
          <ComboboxValue>
            {(values) => {
              if (multiple) {
                const selectedValues = Array.isArray(values) ? values : [];

                return (
                  <>
                    {selectedValues.map((itemValue) => (
                      <ComboboxChip key={itemValue}>
                        {optionMap.get(itemValue) ?? itemValue}
                      </ComboboxChip>
                    ))}

                    <ComboboxChipsInput
                      ref={multipleInputRef}
                      id={id}
                      disabled={disabled}
                      placeholder={selectedValues.length > 0 ? "" : placeholder}
                      className="flex-1"
                      onFocus={() => {
                        if (!disabled) setOpen(true);
                      }}
                    />
                  </>
                );
              }

              const selectedValue = typeof values === "string" ? values : "";
              const selectedLabel = optionMap.get(selectedValue) ?? "";

              return (
                <ComboboxChipsInput
                  ref={singleInputRef}
                  id={id}
                  disabled={disabled}
                  placeholder={selectedLabel ? "" : placeholder}
                  className="flex-1"
                  value={inputValue}
                  onFocus={() => {
                    if (!disabled) {
                      setOpen(true);

                      if (selectedLabel && inputValue === selectedLabel) {
                        setInputValue("");
                      }
                    }
                  }}
                  onBlur={() => {
                    if (!inputValue && selectedLabel) {
                      setInputValue(selectedLabel);
                    }
                  }}
                  onChange={(event) => {
                    setInputValue(event.target.value);
                    if (!disabled) setOpen(true);
                  }}
                />
              );
            }}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>{textNotFound}</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem
                key={item}
                value={item}
                onMouseDown={(event) => {
                  if (multiple) {
                    event.preventDefault();
                  }
                }}
                onClick={() => {
                  if (multiple) {
                    clearMultipleSearch();
                    return;
                  }

                  onChange?.(item);
                  setInputValue(optionMap.get(item) ?? item);
                  forceCloseSingle();
                }}
              >
                {optionMap.get(item) ?? item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {error && message && (
        <span className="text-destructive inline-flex items-center gap-1 text-sm">
          <IoIosWarning className="text-lg" /> {message}
        </span>
      )}

      {description && !error && (
        <FieldDescription>{description}</FieldDescription>
      )}
    </Field>
  );
}
