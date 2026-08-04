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
    toast({
      title: "Subscribed!",
      description: "Thank you. We'll keep you posted on new courses and events.",
      variant: "success",
    });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 lg:p-8">
      <form onSubmit={onSubmit} className="w-full" noValidate>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1">
            <Input
              id="newsletter-email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={success ? "newsletter-success" : undefined}
              className="h-12 bg-white/[0.04] border-white/15 text-white placeholder:text-neutral-400 focus:border-primary/70 focus:ring-primary/30 rounded-xl"
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
        </div>
      </form>
    </div>
  );
}
