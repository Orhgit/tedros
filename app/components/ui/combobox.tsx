import { useId, type InputHTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "list"
> {
  options: ComboboxOption[];
}

/**
 * Combobox built on native <input list="..."> + <datalist>. Free typing,
 * autocomplete, accessibility — all from the browser. No JS state.
 * Trade-off: no async loading; for that, use the future <Combobox.Async>.
 */
export function Combobox({ options, id, className, ...props }: ComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? `cbx-${generatedId}`;
  const listId = `${inputId}-list`;
  return (
    <>
      <input
        id={inputId}
        list={listId}
        className={cn(
          "flex h-10 w-full rounded-sm border border-input bg-card px-3 text-sm",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        )}
        {...props}
      />
      <datalist id={listId}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </datalist>
    </>
  );
}
