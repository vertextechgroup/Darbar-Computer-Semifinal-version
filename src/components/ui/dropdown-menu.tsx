"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type DropdownChildElementProps = React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>;

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
};

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuCtx(name: string) {
  const c = React.useContext(DropdownMenuContext);
  if (!c) throw new Error(`${name} must be inside DropdownMenu`);
  return c;
}

export function DropdownMenu({
  open: controlled,
  defaultOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const open = controlled ?? internal;
  const triggerRef = React.useRef<HTMLElement>(null);

  const setOpen = React.useCallback(
    (v: boolean) => {
      if (controlled === undefined) setInternal(v);
      onOpenChange?.(v);
    },
    [controlled, onOpenChange]
  );

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  asChild = false,
}: {
  children: React.ReactElement;
  asChild?: boolean;
}) {
  const { open, setOpen, triggerRef } = useDropdownMenuCtx("DropdownMenuTrigger");

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<DropdownChildElementProps>;
    const props: DropdownChildElementProps = {
      ref: triggerRef as unknown as React.Ref<HTMLElement>,
      "aria-haspopup": "menu",
      "aria-expanded": open,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props?.onClick?.(e);
        e.stopPropagation();
        setOpen(!open);
      },
    };
    return React.cloneElement(
      child,
      props
    );
  }

  return (
    <span
      ref={triggerRef as unknown as React.RefObject<HTMLSpanElement>}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }}
    >
      {children}
    </span>
  );
}

export function DropdownMenuContent({
  className,
  align = "end",
  sideOffset = 8,
  children,
}: {
  className?: string;
  align?: "start" | "end";
  sideOffset?: number;
  children: React.ReactNode;
}) {
  const { open, setOpen, triggerRef } = useDropdownMenuCtx("DropdownMenuContent");
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null);

  React.useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  React.useLayoutEffect(() => {
    if (!open) return;
    const triggerEl = triggerRef.current;
    const contentEl = contentRef.current;
    if (!triggerEl || !contentEl) return;

    const update = () => {
      const t = triggerEl.getBoundingClientRect();
      const c = contentEl.getBoundingClientRect();
      const top = t.bottom + sideOffset;
      const rawLeft = align === "end" ? t.right - c.width : t.left;
      const left = Math.min(
        Math.max(8, rawLeft),
        Math.max(8, window.innerWidth - c.width - 8)
      );
      const clampedTop = Math.min(
        Math.max(8, top),
        Math.max(8, window.innerHeight - c.height - 8)
      );
      setPos({ top: clampedTop, left });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, align, sideOffset, triggerRef]);

  if (!open || !mounted) return null;

  const content = (
    <div className="fixed inset-0 z-[95]" onMouseDown={() => setOpen(false)} aria-hidden="true">
      <div
        ref={contentRef}
        role="menu"
        className={cn(
          "fixed min-w-[12rem] rounded-xl border border-neutral-200 bg-white shadow-lg p-1",
          "animate-in fade-in-0 zoom-in-95 duration-150",
          className
        )}
        style={pos ? { top: pos.top, left: pos.left } : undefined}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

export function DropdownMenuItem({
  className,
  children,
  onSelect,
  asChild = false,
}: {
  className?: string;
  children: React.ReactNode;
  onSelect?: () => void;
  asChild?: boolean;
}) {
  const { setOpen } = useDropdownMenuCtx("DropdownMenuItem");
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<DropdownChildElementProps>;
    const props: DropdownChildElementProps = {
      role: "menuitem",
      className: cn(
        "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-800",
        "hover:bg-neutral-100 transition-colors duration-150",
        className,
        child.props?.className
      ),
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        child.props?.onClick?.(e);
        onSelect?.();
        setOpen(false);
      },
    };
    return React.cloneElement(
      child,
      props
    );
  }
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-800",
        "hover:bg-neutral-100 transition-colors duration-150",
        className
      )}
      onClick={() => {
        onSelect?.();
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
}
