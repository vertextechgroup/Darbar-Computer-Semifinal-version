import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { CategoryDirectory } from "@/components/sections/CategoryDirectory";
import { CourseGrid } from "@/components/sections/CourseGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { getFeaturedCourses } from "@/content/courses";
import { getUpcomingEvents } from "@/content/events";
import { buildMetadata } from "@/lib/seo";
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import { orgJsonLd } from "@/lib/seo";
import { StatsStrip } from "@/components/sections/StatsStrip";

export const metadata = buildMetadata({
  title: "Computer Training Institute in Kathmandu — 37 Courses",
  path: "/",
  description:
    "Programming, web development, AI, design, networking & more. Certified trainers, small batches, real projects. Book a free consultation.",
  keywords: [
    "computer training",
    "computer institute Nepal",
    "programming courses",
    "Darbar Computer",
    "IT training Kathmandu",
    "computer training institute Kathmandu",
    "computer courses in Nepal",
    "hands-on IT training",
  ],
});

export default function HomePage() {
  const featuredCourses = getFeaturedCourses(6);
  const upcomingEvents = getUpcomingEvents().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />
      <Hero />
      <StatsStrip/>
      <CategoryDirectory />
      <CourseGrid
        courses={featuredCourses}
        eyebrow="Popular Courses"
        title="Our Most-Loved Courses"
        description="Hand-picked programs our students enroll in the most — entry-level foundations to flagship career paths."
      />
      <WhyChooseUs />
      <HowItWorks />

      {upcomingEvents.length > 0 && (
        <section aria-labelledby="events-heading" className="section-padding bg-neutral-50">
          <Container size="xl">
            <div className="flex flex-col items-center gap-4 mb-10 sm:mb-12">
              <SectionHeading
                eyebrow="Upcoming"
                title="Events & Workshops"
                description="Free workshops, open houses, info sessions — join us in person or online."
              />
              <Link href="/events" className="shrink-0">
                <Button variant="outline" size="lg" className="group/btn">
                  View All Events
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((evt) => (
                <Card key={evt.id} className="overflow-hidden group flex flex-col">
                  <Link
                    href={`/events/${evt.slug}`}
                    className="relative block overflow-hidden aspect-[16/9] bg-neutral-100"
                    aria-label={`${evt.title} — view details`}
                  >
                    <Image
                      src={evt.image}
                      alt={evt.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" aria-hidden="true" />
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="shadow-sm">{evt.category}</Badge>
                      <Badge variant="success" className="shadow-sm">Upcoming</Badge>
                    </div>
                  </Link>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg tracking-tight text-neutral-900 leading-snug group-hover:text-primary transition-colors">
                    <Link href={`/events/${evt.slug}`}>{evt.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">
                    {evt.shortDescription}
                  </p>
                  <div className="mt-4 space-y-1.5 text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-primary" />
                      <time dateTime={evt.date}>
                        {new Date(evt.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span className="mx-1">·</span>
                      <Clock className="size-3.5 text-primary" />
                      {evt.time}
                    </div>
                    <div className="flex items-start gap-1.5">
                      <MapPin className="size-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{evt.location}</span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Link href={`/events/${evt.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      <TestimonialCarousel />
      <FAQAccordion compact />
    </>
  );
}
