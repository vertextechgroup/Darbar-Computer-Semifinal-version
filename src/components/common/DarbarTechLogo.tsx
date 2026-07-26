interface DarbarTechLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "light" | "dark";
}

export function DarbarTechLogo({ className = "", size = "md", showText = true, variant = "light" }: DarbarTechLogoProps) {
  const sizeMap = {
    sm: { icon: "h-8 w-8", text: "text-[13px]", sub: "text-[9px]", line: "w-4 h-px" },
    md: { icon: "h-9 w-9", text: "text-[15px]", sub: "text-[11px]", line: "w-5 h-px" },
    lg: { icon: "h-11 w-11", text: "text-xl", sub: "text-[12px]", line: "w-6 h-px" },
  };
  const s = sizeMap[size];

  const colors = variant === "dark"
    ? {
        t: "#5B8FA8",
        d: "#0F70A8",
        darbar: "#ffffff",
        tech: "#0F70A8",
        sub: "#a1a1aa",
        line: "#52525b",
      }
    : {
        t: "#0F70A8",
        d: "#163A5E",
        darbar: "#163A5E",
        tech: "#0F70A8",
        sub: "#5B8FA8",
        line: "#5B8FA8",
      };

  return (
    <div className={`flex items-center gap-2 shrink-0 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`${s.icon} shrink-0`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="5" y="22" width="48" height="16" rx="3" fill={colors.t} />
        <polygon points="48,22 60,22 48,38" fill="#ffffff" />
        <rect x="18" y="38" width="16" height="40" rx="2" fill={colors.t} />
        <path
          d="M34,22
             Q60,22 78,34
             Q88,48 88,62
             Q88,76 74,88
             Q62,95 50,95
             L50,95
             Q50,95 50,80
             Q50,70 50,62
             Q68,62 72,52
             Q72,40 60,34"
          fill={colors.d}
        />
      </svg>
      {showText && (
        <span className="flex flex-col leading-tight">
          <span className={`${s.text} font-bold tracking-tight`}>
            <span style={{ color: colors.darbar }}>Darbar</span>
            <span style={{ color: colors.tech }}>Tech</span>
          </span>
          <span className={`hidden sm:flex items-center gap-2 ${s.sub} font-medium`} style={{ letterSpacing: "0.2em", color: colors.sub }}>
            <span className={`${s.line}`} style={{ backgroundColor: colors.line }} />
            GROUP OF TECHNOLOGY
            <span className={`${s.line}`} style={{ backgroundColor: colors.line }} />
          </span>
        </span>
      )}
    </div>
  );
}
