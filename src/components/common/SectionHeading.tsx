import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      data-slot="section-heading"
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="h-px w-6 bg-primary/40" />
          {eyebrow}
          <span className="h-px w-6 bg-primary/40" />
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-neutral-900">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-neutral-600 text-pretty leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
