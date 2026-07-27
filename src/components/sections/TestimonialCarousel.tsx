"use client";
import * as React from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, UserCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { cn } from "@/lib/utils";
import { testimonials } from "@/content/testimonials";

export function TestimonialCarousel() {
  const [index, setIndex] = React.useState(0);
  const count = testimonials.length;
  const [isMobile, setIsMobile] = React.useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  React.useEffect(() => {
    let rafId: number | null = null;
    const onResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setIsMobile(window.innerWidth < 768);
      });
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const perView = isMobile ? 1 : count >= 3 ? 3 : count >= 2 ? 2 : 1;
  const maxIndex = Math.max(0, count - perView);

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  React.useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [maxIndex]);

  return (
    <section aria-labelledby="testimonial-heading" className="section-padding bg-secondary">
      <Container size="xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-between mb-8 sm:mb-12">
          <div className="flex-1">
            <SectionHeading
              eyebrow="Student Stories"
              title="What Our Graduates Say"
              description="Real feedback from students who've completed our courses and stepped into their first jobs or freelance work."
              variant="dark"
              align="left"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              aria-label="Previous testimonials"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/30 h-11 w-11"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              aria-label="Next testimonials"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white hover:border-white/30 h-11 w-11"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
            aria-live="polite"
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className={cn(
                  "shrink-0 px-1.5 sm:px-3 py-1",
                  isMobile ? "w-full" : perView === 3 ? "w-1/3" : "w-1/2"
                )}
              >
                <Card className="h-full border-white/10 bg-white/95">
                  <CardContent className="p-5 sm:p-7">
                    <Quote className="size-7 sm:size-8 text-primary/40 mb-3 sm:mb-4" aria-hidden="true" />
                    <div className="flex gap-0.5 mb-2.5 sm:mb-3" aria-label={`Rated ${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-4",
                            i < t.rating ? "text-primary fill-primary" : "text-neutral-200 fill-neutral-100"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <blockquote className="text-neutral-800 leading-relaxed text-sm sm:text-[15px] text-pretty">
                      "{t.quote}"
                    </blockquote>
                    <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-neutral-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary overflow-hidden ring-2 ring-white shadow-sm">
                          {t.image ? (
                            <Image
                              src={t.image}
                              alt={`${t.name} — testimonial`}
                              fill
                              sizes="44px"
                              className="object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />
                          ) : null}
                          {!t.image && <UserCircle className="size-6" aria-hidden="true" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-sm text-neutral-900 truncate">
                              {t.name}
                              {t.isPlaceholder && (
                                <span className="sr-only"> (sample student)</span>
                              )}
                            </span>
                            {!t.isPlaceholder && (
                              <span className="inline-flex items-center gap-0.5 shrink-0" title="Verified Graduate">
                                <CheckCircle2 className="size-3.5 text-primary fill-primary/10" aria-hidden="true" />
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-neutral-500 truncate">{t.course} graduate</span>
                            {!t.isPlaceholder && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary/90 bg-primary/10 rounded-full px-2 py-0.5">
                                <CheckCircle2 className="size-2.5" aria-hidden="true" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {t.isPlaceholder && (
                        <Badge variant="outline" className="shrink-0 text-[10px]">
                          SAMPLE
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-1.5" role="tablist" aria-label="Testimonial pages">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to testimonial set ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === index ? "w-8 bg-accent" : "w-2 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
