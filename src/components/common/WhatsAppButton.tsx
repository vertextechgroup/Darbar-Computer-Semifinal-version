"use client";
import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { instituteInfo } from "@/content/institute";
import { cn } from "@/lib/utils";

export function WhatsAppButton() {
  const [visible, setVisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rawWhatsApp = instituteInfo.contact.whatsapp.replace(/[^0-9+]/g, "");
  const waNumber = rawWhatsApp.replace(/^\+/, "");
  const waMessage = encodeURIComponent(
    "Hi DarbarTech! I'm interested in learning more about your courses. Can you help me?"
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;
  const phoneDisplay = instituteInfo.contact.whatsapp.includes("PLACEHOLDER")
    ? "Chat on WhatsApp"
    : instituteInfo.contact.whatsapp;

  return (
    <>
      <div
        className={cn(
          "fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-none transition-all duration-500 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto max-w-[320px] sm:max-w-[340px] bg-white rounded-2xl shadow-2xl shadow-neutral-900/10 border border-neutral-200 overflow-hidden transition-all duration-300 ease-out origin-bottom-right",
            open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
          )}
        >
          <div className="bg-gradient-to-r from-[#128C7E] to-[#25D366] p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <MessageCircle className="size-6" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Chat with us on WhatsApp</p>
                <p className="text-white/80 text-xs mt-0.5">Typically replies within a few hours</p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-5 space-y-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                className="w-full h-11 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-sm shadow-[#25D366]/20 group/btn transition-all duration-200"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Start WhatsApp Chat
              </Button>
            </a>
            <p className="text-center text-xs text-neutral-500">{phoneDisplay}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          aria-expanded={open}
          className={cn(
            "pointer-events-auto relative flex items-center justify-center rounded-full text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 ease-out hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30",
            open
              ? "w-12 h-12 bg-neutral-800 hover:bg-neutral-700 shadow-neutral-900/30"
              : "w-14 h-14 bg-[#25D366] hover:bg-[#128C7E]"
          )}
        >
          <span
            className={cn(
              "absolute inset-0 rounded-full animate-ping opacity-30",
              open ? "bg-neutral-500" : "bg-[#25D366]"
            )}
            aria-hidden="true"
          />
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <MessageCircle className="size-7 relative" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}
