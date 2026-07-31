import Image from "next/image";
import { cn } from "@/lib/utils";

interface DarbarTechLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "light" | "dark";
}

export function DarbarTechLogo({ className = "", size = "md", showText = true, variant = "light" }: DarbarTechLogoProps) {
  const sizeMap: Record<NonNullable<DarbarTechLogoProps["size"]>, number> = {
    sm: 32,
    md: 36,
    lg: 44,
  };
  const heightPx = sizeMap[size];

  const finalLogoSrc = "/images/logo/final-logo.png";

  const lockupAlt = "DarbarTech Group of Technology";

  const renderFinalLogo = (props?: { className?: string }) => (
    <Image
      src={finalLogoSrc}
      width={Math.round(heightPx * 1.942)}
      height={heightPx}
      alt={lockupAlt}
      className={props?.className}
    />
  );

  return (
    <span className={cn("inline-flex items-center shrink-0", className)}>
      {renderFinalLogo()}
    </span>
  );
}
