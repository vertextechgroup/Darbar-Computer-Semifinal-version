import Link from "next/link";
import { PhoneCall, ArrowRight, MessageSquare } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export function CTABanner() {
  return (
    <section aria-labelledby="cta-heading" className="py-10 sm:py-16 bg-white">
      <Container size="xl">
        <div className="relative isolate overflow-hidden rounded-2xl sm:rounded-3xl gradient-primary px-5 sm:px-10 py-10 sm:py-16 lg:px-16 text-white shadow-xl shadow-primary/20">
          <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
          <div
            className="absolute -top-24 -right-24 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-secondary/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <h2
                id="cta-heading"
                className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance"
              >
                Ready to Start Your Course?
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/85 leading-relaxed max-w-xl">
                Enrollment is open for upcoming batches. Book a free demo or talk to our counselor today — no commitments, just guidance.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:justify-self-end w-full sm:w-auto">
              <Link href="/admissions/inquire" className="w-full">
                <Button size="lg" className="text-white bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg shadow-black/10 w-full group/btn">
                  <MessageSquare className="size-5" aria-hidden="true" />
                  Enquire About Admission
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                </Button>
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/15 backdrop-blur-sm px-5 h-12 text-sm sm:text-base font-medium text-white transition-colors duration-200"
              >
                <PhoneCall className="size-5" aria-hidden="true" />
                <span className="truncate">Call {SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
