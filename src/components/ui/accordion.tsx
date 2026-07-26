"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext(componentName: string) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error(`${componentName} must be used within Accordion`);
  return ctx;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", defaultValue, className, children, ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
      if (!defaultValue) return new Set();
      return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
    });

    const toggleItem = React.useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          const next = new Set(prev);
          if (next.has(value)) {
            next.delete(value);
          } else {
            if (type === "single") next.clear();
            next.add(value);
          }
          return next;
        });
      },
      [type]
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <div ref={ref} data-slot="accordion" className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="accordion-item"
      data-state={useAccordionContext("AccordionItem").openItems.has(value) ? "open" : "closed"}
      className={cn("border-b border-neutral-200 last:border-b-0 first:border-t", className)}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { _itemValue: value }) : child
      )}
    </div>
  )
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  _itemValue?: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, _itemValue, ...props }, ref) => {
    const ctx = useAccordionContext("AccordionTrigger");
    const isOpen = _itemValue ? ctx.openItems.has(_itemValue) : false;
    return (
      <button
        ref={ref}
        data-slot="accordion-trigger"
        type="button"
        aria-expanded={isOpen}
        onClick={() => _itemValue && ctx.toggleItem(_itemValue)}
        className={cn(
          "flex flex-1 w-full items-center justify-between py-4 text-left text-sm font-medium transition-all hover:bg-neutral-50 rounded-md px-2 group",
          className
        )}
        {...props}
      >
        <span className="pr-4">{children}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-neutral-500 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
            "group-hover:text-primary"
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  _itemValue?: string;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, _itemValue, ...props }, ref) => {
    const ctx = useAccordionContext("AccordionContent");
    const isOpen = _itemValue ? ctx.openItems.has(_itemValue) : false;
    const contentRef = React.useRef<HTMLDivElement>(null);

    return (
      <div
        ref={ref}
        data-slot="accordion-content"
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "overflow-hidden text-sm text-neutral-600 transition-all duration-300 ease-out",
          isOpen ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0",
          className
        )}
        aria-hidden={!isOpen}
        {...props}
      >
        <div ref={contentRef} className="px-2 pb-2 leading-relaxed">
          {children}
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
