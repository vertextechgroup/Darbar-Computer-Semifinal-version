import Link from "next/link";
import { PhoneCall, ArrowRight, MessageSquare } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export function CTABanner() {
  return (
    <section aria-labelledby="cta-heading" className="py-12 sm:py-16">
      <Container size="xl">
        <div className="relative isolate overflow-hidden rounded-3xl gradient-primary px-6 py-12 sm:px-10 sm:py-16 lg:px-16 text-white shadow-xl shadow-primary/20">
          <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden="true" />
          <div
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2
                id="cta-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance"
              >
                Ready to Start Your Course?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
                Enrollment is open for upcoming batches. Book a free demo or talk to our counselor today — no commitments, just guidance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:justify-self-end">
              <Link href="/admissions/inquire" className="w-full sm:w-auto">
                <Button size="lg" className="h-12 text-white bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg shadow-black/10 w-full sm:w-auto">
                  <MessageSquare className="size-5" aria-hidden="true" />
                  Enquire About Admission
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 hover:bg-white/15 backdrop-blur-sm px-5 h-12 text-sm sm:text-base font-medium text-white transition-colors"
              >
                <PhoneCall className="size-5" aria-hidden="true" />
                Call {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
