"use client";
import * as React from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function NewsletterSignup() {
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address.",
        variant: "error",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "error",
      });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSuccess(true);
    setEmail("");
    // TODO: POST /api/v1/newsletter/subscribe once CMS backend exists
    console.log("[NewsletterSignup] Stub submission:", { email });
    toast({
      title: "Subscribed!",
      description: "Thank you. We'll keep you posted on new courses and events.",
      variant: "success",
    });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="relative isolate overflow-hidden rounded-2xl sm:rounded-3xl border border-primary/20 bg-gradient-to-br from-secondary/90 via-[#0F2240] to-secondary/80 p-5 sm:p-7 lg:p-8 shadow-[0_10px_40px_-12px_rgba(21,103,142,0.35)]">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(78,140,174,0.12) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary/30 blur-[100px]" />
      </div>
      <div className="absolute -left-px top-6 bottom-6 w-[3px] rounded-full gradient-primary" aria-hidden="true" />
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-6 md:gap-10 items-center pl-0 sm:pl-2">
        <div className="md:col-span-2">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary/85 mb-2">
            — Newsletter
          </div>
          <h4 className="text-white font-semibold text-base sm:text-lg mb-1.5 leading-snug">
            Stay Updated with DarbarTech
          </h4>
          <p className="text-sm text-neutral-300/85 leading-relaxed">
            Join our newsletter for new course announcements, free workshop invites, and student success stories.
          </p>
        </div>
        <form onSubmit={onSubmit} className="md:col-span-3 w-full" noValidate>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <div className="flex flex-col gap-3">
            <div className="relative flex-1">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby={success ? "newsletter-success" : undefined}
                className="h-12 bg-white/[0.04] border-white/15 text-white placeholder:text-neutral-400 focus:border-primary/70 focus:ring-primary/30 rounded-xl backdrop-blur-sm"
              />
              {success && (
                <div
                  id="newsletter-success"
                  role="status"
                  className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-success"
                >
                  <CheckCircle2 className="size-5" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className={cn(
                  "w-full sm:w-auto sm:min-w-[170px]",
                  "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30",
                  submitting && "opacity-80"
                )}
              >
                {submitting ? (
                  "Subscribing..."
                ) : (
                  <>
                    <Send className="size-4" aria-hidden="true" />
                    Subscribe
                  </>
                )}
              </Button>
              <p className="text-[11px] text-neutral-400/80 sm:text-right">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
