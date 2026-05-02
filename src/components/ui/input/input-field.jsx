import { Field, FieldDescription, FieldLabel } from "@components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@components/ui/input/input-group";
import { useId, useState } from "react";
import { IoIosWarning } from "react-icons/io";

export function InputField({
  label,
  descriptions,
  placeholder = "Masukan Input",
  error,
  message,
  disabled,
  required,
  value,
  typeInput = "text",
  icon: Icon,
  handleChange,
  alignIcon = "inline-start",
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field data-disabled={disabled} data-invalid={error}>
      {label && (
        <FieldLabel htmlFor={id}>
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      <InputGroup>
        <InputGroupInput
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error}
          onChange={handleChange}
          value={value}
          type={showPassword ? "text" : typeInput}
        />
        {Icon && (
          <InputGroupAddon
            className={typeInput === "password" && "cursor-pointer"}
            align={typeInput === "password" ? "inline-end" : alignIcon}
            onClick={() => setShowPassword((show) => !show)}
          >
            <Icon className="text-muted-foreground" />
          </InputGroupAddon>
        )}
      </InputGroup>
      {error && message && (
        <span className="text-destructive inline-flex items-center gap-1">
          <IoIosWarning className="text-lg" /> {message}
        </span>
      )}
      {descriptions && <FieldDescription>{descriptions}</FieldDescription>}
    </Field>
  );
}
