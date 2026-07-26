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
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-center">
        <div className="md:col-span-2">
          <h4 className="text-white font-semibold text-lg mb-1.5">
            Stay Updated
          </h4>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Join our newsletter for new course announcements, free workshop invites, and student success stories.
          </p>
        </div>
        <form onSubmit={onSubmit} className="md:col-span-3 w-full" noValidate>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby={success ? "newsletter-success" : undefined}
                className="h-11 bg-neutral-950 border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:border-primary focus:ring-primary/30"
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
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className={cn("h-11 sm:w-auto w-full px-5", submitting && "opacity-80")}
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
          </div>
          <p className="mt-2 text-[11px] text-neutral-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}
