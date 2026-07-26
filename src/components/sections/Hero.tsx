import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, PlayCircle, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { Container } from "@/components/common/Container";
import { instituteInfo } from "@/content/institute";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Wide panoramic hero banner composite for DarbarTech computer training institute Nepal, collage showing diverse students learning programming on laptops, graphic design on tablets, hardware lab practice, happy graduates with certificates, bright modern classrooms, inspiring education atmosphere, professional layered collage composition, warm uplifting lighting, photorealistic HD banner image")}&image_size=landscape_16_9`}
          alt=""
          fill
          priority
          className="object-cover opacity-[0.08] sm:opacity-[0.07]"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 -z-10 grid-pattern opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary/30 via-accent/20 to-primary/30 opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
        />
      </div>

      <div className="absolute inset-0 -z-10 hidden lg:block pointer-events-none" aria-hidden="true">
        <div className="absolute left-4 top-24 w-44 h-32 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/40 rotate-[-4deg] opacity-70">
          <Image
            src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Young Nepali students coding React JavaScript on desktop PCs, modern bright computer lab, professional training Nepal, HD photorealistic")}&image_size=landscape_4_3`}
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute right-6 top-32 w-48 h-36 rounded-xl overflow-hidden shadow-2xl shadow-secondary/10 border border-white/40 rotate-[5deg] opacity-75">
          <Image
            src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Creative Nepali graphic designer student working on Wacom tablet with Photoshop Illustrator, colorful design studio, HD photorealistic")}&image_size=landscape_4_3`}
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute left-8 bottom-28 w-40 h-28 rounded-xl overflow-hidden shadow-2xl shadow-accent/10 border border-white/40 rotate-[3deg] opacity-70">
          <Image
            src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Happy Nepali student receiving certificate during graduation ceremony, smiling proud graduate, celebration event, HD photorealistic")}&image_size=landscape_4_3`}
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute right-10 bottom-32 w-52 h-32 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/40 rotate-[-6deg] opacity-75">
          <Image
            src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Hardware networking lab students assembling PC motherboards routers, technician lab Nepal, hands-on practical training, HD photorealistic")}&image_size=landscape_4_3`}
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </div>

      <Container size="xl" className="py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6 px-3 py-1">
            <Sparkles className="size-3.5 mr-1" aria-hidden="true" />
            New Batches Starting Every Week · Enroll Today
          </Badge>

          <h1
            id="hero-heading"
            className="text-4xl font-extrabold tracking-tight text-neutral-900 text-balance sm:text-5xl lg:text-6xl"
          >
            Build the{" "}
            <span className="gradient-text-primary">Digital Skills</span>
            <br className="hidden sm:block" /> That Power Your Career
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-600 text-pretty mx-auto max-w-2xl">
            Professional, hands-on computer training in Nepal — from beginner computer literacy to full-stack
            web development, graphic design, accounting, and hardware networking. Small classes,
            certified trainers, real projects.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link href="/courses" className="w-full sm:w-auto">
              <Button size="lg" className="h-12 px-6 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow w-full sm:w-auto">
                <BookOpen className="size-5" aria-hidden="true" />
                Explore Courses
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/admissions/inquire" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-12 px-6 text-base border-2 w-full sm:w-auto">
                <PlayCircle className="size-5" aria-hidden="true" />
                Book a Free Demo Class
              </Button>
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
            {instituteInfo.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <dt className="text-xs sm:text-sm text-neutral-500 font-medium leading-tight order-2 mt-1">
                  {s.label}
                  {s.isPlaceholder && <span className="sr-only"> (illustrative)</span>}
                </dt>
                <dd className="text-2xl sm:text-3xl font-bold tracking-tight text-primary order-1">
                  {s.value}
                  {s.isPlaceholder && <span className="text-xs align-super text-neutral-400">*</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
