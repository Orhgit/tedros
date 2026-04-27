import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "~/lib/utils";

/**
 * Form primitives — purposely framework-agnostic. Pair with React Router's
 * <Form>, react-hook-form, or any client-side library. Wires up
 * label↔input↔error/description with stable ids and ARIA.
 */

interface FieldCtx {
  fieldId: string;
  descId: string;
  errorId: string;
  invalid: boolean;
}
const Ctx = createContext<FieldCtx | null>(null);

export function FormField({
  invalid = false,
  className,
  children,
}: {
  invalid?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <Ctx.Provider
      value={{
        fieldId: `f-${id}`,
        descId: `d-${id}`,
        errorId: `e-${id}`,
        invalid,
      }}
    >
      <div className={cn("flex flex-col gap-1.5", className)}>{children}</div>
    </Ctx.Provider>
  );
}

function useField() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Form sub-components must be inside <FormField>");
  return ctx;
}

export function FormLabel({
  className,
  required,
  ...props
}: HTMLAttributes<HTMLLabelElement> & { required?: boolean; htmlFor?: string }) {
  const { fieldId } = useField();
  return (
    <label
      htmlFor={fieldId}
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    >
      {props.children}
      {required && (
        <span aria-hidden className="ms-0.5 text-destructive">
          *
        </span>
      )}
    </label>
  );
}

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
};

export function FormControl({ children }: { children: ReactNode }) {
  const { fieldId, descId, errorId, invalid } = useField();
  const describedBy = [descId, invalid ? errorId : ""].filter(Boolean).join(" ");

  // Inject id + aria onto the first valid React element child so the
  // <label htmlFor> in <FormLabel> resolves and SRs read description / error.
  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const element = child as ReactElement<ControlProps>;
        const childProps = element.props;
        const existingDescribedBy = childProps["aria-describedby"];
        return cloneElement(element, {
          id: childProps.id ?? fieldId,
          "aria-describedby":
            [existingDescribedBy, describedBy].filter(Boolean).join(" ") || undefined,
          "aria-invalid": childProps["aria-invalid"] ?? (invalid ? true : undefined),
        });
      })}
    </>
  );
}

export function FormDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  const { descId } = useField();
  return (
    <p
      id={descId}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

export function FormMessage({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  const { errorId, invalid } = useField();
  if (!invalid && !props.children) return null;
  return (
    <p
      id={errorId}
      role="alert"
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    />
  );
}

export function useFormField() {
  return useField();
}
