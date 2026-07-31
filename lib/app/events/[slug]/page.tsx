import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
  Users,
  ArrowLeft,
  MessageSquare,
  Tag,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { events, getEventBySlug, getUpcomingEvents } from "@/content/events";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const evt = getEventBySlug(slug);
  if (!evt) {
    return buildMetadata({ title: "Event Not Found", path: `/events/${slug}` });
  }
  return buildMetadata({
    title: evt.title,
    description: evt.shortDescription,
    path: `/events/${evt.slug}`,
    images: [evt.image],
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const evt = getEventBySlug(slug);
  if (!evt) notFound();

  const related = getUpcomingEvents()
    .filter((e) => e.id !== evt.id)
    .slice(0, 2);

  const categoryColors: Record<string, "default" | "secondary" | "accent" | "success" | "warning"> = {
    Workshop: "accent",
    Seminar: "secondary",
    "Open House": "success",
    Certification: "default",
    Other: "warning",
  };

  return (
    <>
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="pt-4 pb-8 sm:pb-10">
          <Breadcrumbs
            items={[
              { label: "Events", href: "/events" },
              { label: evt.title },
            ]}
          />
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-3 mb-4">
            <ArrowLeft className="size-4" />
            Back to all events
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={categoryColors[evt.category] ?? "default"}>
              <Tag className="size-3 mr-1" />
              {evt.category}
            </Badge>
            {evt.upcoming ? (
              <Badge variant="success">
                <CalendarDays className="size-3 mr-1" />
                Upcoming
              </Badge>
            ) : (
              <Badge variant="outline">Past Event</Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 text-balance max-w-4xl">
            {evt.title}
          </h1>
        </Container>
      </div>

      <section className="py-10 sm:py-14">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 aspect-[16/9]">
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <CalendarDays className="size-20 text-primary/20" />
                </div>
                <Image
                  src={evt.image}
                  alt={evt.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover bg-neutral-100"
                />
              </div>

              <article>
                <h2 className="text-xl font-bold tracking-tight text-neutral-900 mb-4">
                  About this event
                </h2>
                <div className="text-[15px] text-neutral-700 leading-relaxed space-y-4 whitespace-pre-line">
                  {evt.fullDescription}
                </div>
              </article>

              {related.length > 0 && (
                <div className="pt-4">
                  <Separator className="mb-6" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Other upcoming events
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.map((r) => (
                      <Card key={r.id} className="overflow-hidden group flex flex-col">
                        <Link
                          href={`/events/${r.slug}`}
                          className="relative block overflow-hidden aspect-[16/9] bg-neutral-100 shrink-0"
                          aria-label={`${r.title} — view details`}
                        >
                          <Image
                            src={r.image}
                            alt={r.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" aria-hidden="true" />
                          <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5">
                            <Badge variant={categoryColors[r.category] ?? "default"} className="text-[10px] shadow-sm">
                              {r.category}
                            </Badge>
                            <Badge variant="success" className="text-[10px] shadow-sm">
                              Upcoming
                            </Badge>
                          </div>
                        </Link>
                        <CardContent className="p-4 flex-1 flex flex-col">
                          <h4 className="font-semibold text-[15px] text-neutral-900 leading-snug group-hover:text-primary transition-colors">
                            <Link href={`/events/${r.slug}`}>{r.title}</Link>
                          </h4>
                          <div className="mt-2 text-xs text-neutral-500 flex flex-wrap gap-x-3 gap-y-1 mt-auto pt-2">
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="size-3" />
                              {new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="size-3" />
                              {r.time}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] space-y-5">
                <Card className="shadow-md overflow-hidden">
                  <div className="h-1.5 gradient-primary w-full" />
                  <CardContent className="p-6 space-y-5">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      Event Details
                    </h3>
                    <ul className="space-y-3.5">
                      <li className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <CalendarDays className="size-4.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                            Date
                          </div>
                          <time dateTime={evt.date} className="font-semibold text-neutral-900">
                            {new Date(evt.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary-foreground">
                          <Clock className="size-4.5" />
                        </div>
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                            Time
                          </div>
                          <div className="font-semibold text-neutral-900">{evt.time}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                          <MapPin className="size-4.5" />
                        </div>
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                            Location
                          </div>
                          <div className="font-medium text-neutral-800 leading-relaxed">{evt.location}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
                          <Users className="size-4.5" />
                        </div>
                        <div>
                          <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                            Audience
                          </div>
                          <div className="font-medium text-neutral-800">
                            Open to all · Free entry · Limited seats
                          </div>
                        </div>
                      </li>
                    </ul>

                    <Separator />

                    {evt.upcoming ? (
                      <div className="space-y-2.5 pt-1">
                        <Link
                          href={`/admissions/inquire?course=general-counseling&utm_source=event&utm_campaign=${encodeURIComponent(evt.slug)}`}
                        >
                          <Button size="lg" className="w-full shadow-lg shadow-primary/20 h-12">
                            <MessageSquare className="size-5" />
                            RSVP / Ask a Question
                          </Button>
                        </Link>
                        <p className="text-[11px] text-neutral-500 leading-relaxed text-center pt-1">
                          Send us an inquiry mentioning this event — we&apos;ll reserve your spot.
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center">
                        <p className="text-sm text-neutral-600">
                          This event has already taken place.
                        </p>
                        <Link href="/events" className="mt-3 block">
                          <Button variant="outline" className="w-full">
                            View Upcoming Events
                            <ArrowRight className="size-4" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
