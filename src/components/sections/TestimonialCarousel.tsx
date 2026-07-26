"use client";
import * as React from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, UserCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { cn } from "@/lib/utils";
import { testimonials } from "@/content/testimonials";

export function TestimonialCarousel() {
  const [index, setIndex] = React.useState(0);
  const count = testimonials.length;
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
    <section aria-labelledby="testimonial-heading" className="section-padding bg-gradient-to-b from-neutral-50 to-white">
      <Container size="xl">
        <div className="flex items-end justify-between gap-4 flex-col sm:flex-row mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="Student Stories"
            title="What Our Graduates Say"
            description="Real feedback from students who've completed our courses and stepped into their first jobs or freelance work."
            align="left"
            className="mx-0"
          />
          <div className="flex items-center gap-2 shrink-0 mx-auto sm:mx-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              aria-label="Next testimonials"
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
                  "shrink-0 px-2 sm:px-3 py-1",
                  isMobile ? "w-full" : perView === 3 ? "w-1/3" : "w-1/2"
                )}
              >
                <Card className="h-full border-neutral-200 bg-white">
                  <CardContent className="p-6 sm:p-7">
                    <Quote className="size-8 text-secondary/40 mb-4" aria-hidden="true" />
                    <div className="flex gap-0.5 mb-3" aria-label={`Rated ${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-4",
                            i < t.rating ? "text-secondary fill-secondary" : "text-neutral-200 fill-neutral-100"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <blockquote className="text-neutral-800 leading-relaxed text-[15px] text-pretty">
                      "{t.quote}"
                    </blockquote>
                    <div className="mt-5 pt-5 border-t border-neutral-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary overflow-hidden ring-2 ring-white shadow-sm">
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
                          <div className="font-semibold text-sm text-neutral-900 truncate">
                            {t.name}
                            {t.isPlaceholder && (
                              <span className="sr-only"> (sample student)</span>
                            )}
                          </div>
                          <div className="text-xs text-neutral-500 truncate">{t.course} graduate</div>
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
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-primary" : "w-2 bg-neutral-300 hover:bg-neutral-400"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
