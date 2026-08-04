"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, MessageCircle, LogIn, UserPlus, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HEADER_NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { DarbarTechLogo } from "@/components/common/DarbarTechLogo";
import { instituteInfo } from "@/content/institute";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const closeSheet = () => setOpen(false);

  const accountActive = isActive("/student/login") || isActive("/student/register");

  const rawWhatsApp = instituteInfo.contact.whatsapp.replace(/[^0-9+]/g, "");
  const waNumber = rawWhatsApp.replace(/^\+/, "");
  const waMessage = encodeURIComponent(
    "Hi DarbarTech! I'd like to inquire about your courses."
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-[80] w-full border-b border-[#222F5D]/6 bg-[#FAFCFF]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#FAFCFF]/55 transition-all duration-300 ease-out",
        scrolled && "shadow-[0_8px_28px_-12px_rgba(34,47,93,0.18)] ring-1 ring-[#222F5D]/4"
      )}
      role="banner"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group min-h-[44px] items-center py-1"
            aria-label={`${SITE_CONFIG.name} - Go to home page`}
          >
            <DarbarTechLogo size="md" priority />
          </Link>

          <nav
            role="navigation"
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative h-11 px-3 flex items-center justify-center rounded-xl text-sm font-medium transition-colors duration-200 ease",
                  "after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1.5 after:h-0.5 after:bg-primary after:rounded-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease",
                  isActive(link.href)
                    ? "text-primary after:scale-x-100"
                    : "text-neutral-700 hover:text-primary hover:after:scale-x-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`}
              className="hidden md:inline-flex items-center gap-1.5 h-11 px-3 rounded-xl text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors duration-200"
              aria-label={`Call ${SITE_CONFIG.phone}`}
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="hidden xl:inline">{SITE_CONFIG.phone}</span>
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center justify-center rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 h-11 w-11 transition-all duration-200"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
            <Link href="/admissions/inquire" className="hidden sm:inline-flex">
              <Button size="sm" className="h-11 px-4 sm:px-5">Enquire Now</Button>
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden h-11 w-11"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88%] sm:w-[380px] overflow-y-auto px-4 sm:px-6">
                <SheetHeader className="pt-2">
                  <SheetTitle>
                    <div className="py-1">
                      <DarbarTechLogo size="sm" />
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav
                  role="navigation"
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-1 px-1 py-5"
                >
                  {HEADER_NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSheet}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "rounded-xl h-12 px-4 flex items-center text-[15px] font-medium transition-colors duration-200",
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-neutral-800 hover:bg-neutral-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-5 pt-5 border-t border-neutral-200 space-y-2.5">
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2">
                        Your Account
                      </div>
                      <div className="space-y-2">
                        <Link href="/student/login" onClick={closeSheet} className="w-full flex">
                          <Button variant="outline" className="w-full h-11 justify-start">
                            <LogIn className="size-5" aria-hidden="true" />
                            Log In
                          </Button>
                        </Link>
                        <Link href="/student/register" onClick={closeSheet} className="w-full flex">
                          <Button variant="outline" className="w-full h-11 justify-start">
                            <UserPlus className="size-5" aria-hidden="true" />
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeSheet}
                      className="w-full flex"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-12 border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/10 hover:text-[#128C7E] hover:border-[#25D366]/60"
                      >
                        <MessageCircle className="size-5" aria-hidden="true" />
                        WhatsApp: Quick Chat
                      </Button>
                    </a>
                    <Link href="/admissions/inquire" onClick={closeSheet} className="w-full flex">
                      <Button className="w-full h-12">Enquire Now</Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "hidden sm:inline-flex",
                    accountActive && "border-primary text-primary bg-primary/5"
                  )}
                  aria-label="Student account"
                >
                  <CircleUserRound className="size-5" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/student/login" aria-label="Student Log In">
                    <LogIn className="size-4" aria-hidden="true" />
                    Log In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/student/register" aria-label="Student Sign Up">
                    <UserPlus className="size-4" aria-hidden="true" />
                    Sign Up
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
