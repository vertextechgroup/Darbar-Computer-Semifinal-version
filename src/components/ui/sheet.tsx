"use client";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};
const SheetContext = React.createContext<SheetContextValue | null>(null);
function useSheetCtx(name: string) {
  const c = React.useContext(SheetContext);
  if (!c) throw new Error(`${name} inside Sheet`);
  return c;
}

interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({ open: controlled, defaultOpen, onOpenChange, children }: SheetProps) {
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const open = controlled ?? internal;
  const setOpen = React.useCallback(
    (v: boolean) => {
      if (controlled === undefined) setInternal(v);
      onOpenChange?.(v);
    },
    [controlled, onOpenChange]
  );

  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({ children }: { children: React.ReactElement }) {
  const { setOpen } = useSheetCtx("SheetTrigger");
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        (children.props as any).onClick?.(e);
        setOpen(true);
      },
    } as any);
  }
  return <span onClick={() => setOpen(true)}>{children}</span>;
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
}

export function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetContentProps) {
  const { open, setOpen } = useSheetCtx("SheetContent");
  if (!open) return null;

  const sideClasses = {
    left: "left-0 top-0 h-full w-3/4 max-w-sm border-r",
    right: "right-0 top-0 h-full w-3/4 max-w-sm border-l",
    top: "top-0 left-0 w-full max-h-[90vh] border-b",
    bottom: "bottom-0 left-0 w-full max-h-[90vh] border-t",
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        data-slot="sheet-content"
        className={cn(
          "absolute bg-background shadow-xl transition-transform duration-300 animate-in",
          sideClasses[side],
          className
        )}
        {...props}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 z-10"
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-2 p-4 pb-2", className)} {...props} />;
}
export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}
export function SheetDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-neutral-600", className)} {...props} />;
}
