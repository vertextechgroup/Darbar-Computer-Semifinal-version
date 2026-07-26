"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { DarbarTechLogo } from "@/components/common/DarbarTechLogo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const closeSheet = () => setOpen(false);

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60"
      role="banner"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group"
            aria-label={`${SITE_CONFIG.name} - Go to home page`}
          >
            <DarbarTechLogo size="md" />
          </Link>

          <nav
            role="navigation"
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-primary bg-primary/5"
                    : "text-neutral-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`}
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-primary transition-colors"
              aria-label={`Call ${SITE_CONFIG.phone}`}
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="hidden xl:inline">{SITE_CONFIG.phone}</span>
            </a>
            <Link href="/admissions/inquire" className="hidden sm:inline-flex">
              <Button>Enquire Now</Button>
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:w-[380px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <DarbarTechLogo size="sm" />
                  </SheetTitle>
                </SheetHeader>
                <nav
                  role="navigation"
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-1 px-2 py-4"
                >
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSheet}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "rounded-md px-3 py-3 text-base font-medium transition-colors",
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-neutral-800 hover:bg-neutral-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <Link href="/admissions/inquire" onClick={closeSheet} className="w-full flex">
                      <Button className="w-full">Enquire Now</Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
