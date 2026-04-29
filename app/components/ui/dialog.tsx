import {
  forwardRef,
  type DialogHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "~/lib/utils";

/**
 * Native <dialog>-based modal. Uses the platform a11y semantics
 * (focus trap, Esc-to-close) without pulling in Radix Dialog.
 *
 * Usage:
 *   const ref = useRef<HTMLDialogElement>(null);
 *   <Button onClick={() => ref.current?.showModal()}>Open</Button>
 *   <Dialog ref={ref} heading="Confirm">...</Dialog>
 */
export interface DialogProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  "title"
> {
  heading?: ReactNode;
  description?: ReactNode;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ className, heading, description, children, ...props }, ref) => (
    <dialog
      ref={ref}
      className={cn(
        "fixed inset-0 m-auto rounded-lg border border-border bg-card text-card-foreground shadow-lg",
        "p-0 backdrop:bg-foreground/40 backdrop:backdrop-blur-sm",
        "w-[calc(100vw-2rem)] max-w-lg",
        className,
      )}
      {...props}
    >
      {(heading || description) && (
        <header className="border-b border-border p-6">
          {heading && <h2 className="text-lg leading-tight font-semibold">{heading}</h2>}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </header>
      )}
      <div className="p-6">{children}</div>
    </dialog>
  ),
);
Dialog.displayName = "Dialog";

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-border p-6 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}
