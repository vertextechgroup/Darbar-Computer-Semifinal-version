import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, CalendarCheck, Award, Users, Code2, Palette, Calculator, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { Container } from "@/components/common/Container";
import { instituteInfo } from "@/content/institute";

export function Hero() {
  const courseIcons = [
    { icon: Code2, label: "Web Dev", color: "text-primary bg-primary/10" },
    { icon: Palette, label: "Design", color: "text-accent bg-accent/10" },
    { icon: Calculator, label: "Accounting", color: "text-secondary bg-secondary/10" },
    { icon: Server, label: "Hardware", color: "text-success bg-success/10" },
  ];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      <div
        className="absolute inset-0 -z-10 opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2315678E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute -top-32 -right-32 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] -z-10 rounded-full bg-primary/10 blur-3xl opacity-70" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] -z-10 rounded-full bg-secondary/10 blur-3xl opacity-70" aria-hidden="true" />
      <div className="absolute top-1/3 -left-12 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 -z-10 rounded-full bg-accent/10 blur-3xl opacity-50" aria-hidden="true" />

      <Container size="xl" className="py-12 sm:py-16 lg:py-24 xl:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 xl:col-span-6">
            <Badge variant="default" className="mb-5 sm:mb-6 px-3.5 py-1.5 sm:px-4 sm:py-2 gap-2 rounded-full border-primary/25 bg-gradient-to-r from-primary/12 via-accent/12 to-secondary/10 text-secondary shadow-sm backdrop-blur-sm">
              <span className="relative flex items-center justify-center">
                <span className="absolute h-1.5 w-1.5 rounded-full bg-primary/50 animate-ping" />
                <Award className="size-3.5 text-primary" aria-hidden="true" />
              </span>
              <span className="font-bold tracking-[0.16em] uppercase text-[10.5px] sm:text-[11px]">
                Certified Training Institute · Nepal
              </span>
            </Badge>

            <h1
              id="hero-heading"
              className="text-[34px] sm:text-4xl sm:text-[44px] lg:text-[62px] xl:text-[68px] font-extrabold tracking-[-0.025em] text-neutral-900 text-balance leading-[1.1] sm:leading-[1.06] lg:leading-[1.02]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-secondary via-[#0F3D5E] to-primary">
                Advance Your Career
              </span>{" "}
              with{" "}
              <span className="gradient-text-primary relative inline-block">
                Professional Digital Skills
                <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-accent/0 rounded-full opacity-70" aria-hidden="true" />
              </span>
            </h1>

            <p className="mt-5 sm:mt-6 text-[15px] sm:text-lg leading-7 sm:leading-8 text-neutral-600 text-pretty max-w-xl">
              Industry-aligned computer training designed for Nepal&apos;s job market. Master web development,
              graphic design, accounting, IT infrastructure, and more — with certified instructors,
              dedicated labs, and career support.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-col gap-3">
              <Link href="/courses" className="w-full">
                <Button size="lg" className="h-12 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 w-full group/btn rounded-2xl">
                  <BookOpen className="size-5" aria-hidden="true" />
                  Explore Courses
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/admissions/inquire" className="w-full">
                <Button size="lg" variant="outline" className="h-12 w-full rounded-2xl border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                  <CalendarCheck className="size-5" aria-hidden="true" />
                  Schedule Free Consultation
                </Button>
              </Link>
            </div>

            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {[
                    "https://images.pexels.com/photos/33261958/pexels-photo-33261958.jpeg?auto=compress&cs=tinysrgb&w=100",
                    "https://images.pexels.com/photos/33261955/pexels-photo-33261955.jpeg?auto=compress&cs=tinysrgb&w=100",
                    "https://images.pexels.com/photos/34381970/pexels-photo-34381970.jpeg?auto=compress&cs=tinysrgb&w=100",
                    "https://images.pexels.com/photos/33261951/pexels-photo-33261951.jpeg?auto=compress&cs=tinysrgb&w=100",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white shadow-sm overflow-hidden bg-neutral-100"
                    >
                      <Image
                        src={src}
                        alt={`Student ${i + 1}`}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-neutral-900">Trusted by 3,000+ Students</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg key={i} className="size-3.5 fill-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs font-medium text-neutral-600">4.9/5 · 500+ Reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <dl className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4 sm:gap-6 border-t border-neutral-100 pt-6 sm:pt-8">
              {instituteInfo.stats.slice(0, 4).map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dd className="text-xl sm:text-2xl sm:text-3xl font-extrabold tracking-tight text-secondary">
                    {s.value}
                    {s.isPlaceholder && <span className="text-xs align-super text-neutral-400">*</span>}
                  </dd>
                  <dt className="mt-1 text-xs sm:text-sm text-neutral-500 font-medium leading-tight">
                    {s.label}
                    {s.isPlaceholder && <span className="sr-only"> (illustrative)</span>}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6 xl:col-span-6 relative">
            <div className="relative mx-auto max-w-[440px] sm:max-w-[520px] lg:max-w-none">
              <div className="relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-[5/6] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-secondary/15 border border-white/80 bg-neutral-100">
                <Image
                  src="https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Students in professional computer lab training session"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-secondary/5 to-transparent" aria-hidden="true" />
              </div>

              <div className="absolute -left-2 sm:-left-4 sm:-left-6 top-[12%] sm:top-16 sm:top-20 bg-white rounded-2xl shadow-xl shadow-neutral-900/10 border border-neutral-100 p-3.5 sm:p-4 sm:p-5 w-[190px] sm:w-[220px] sm:w-[260px] backdrop-blur-sm">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Users className="size-4 sm:size-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] sm:text-[13px] font-semibold text-neutral-900 leading-snug">Small Batch Sizes</p>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 leading-relaxed">Max 12 students per class for personalized attention</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-2 sm:-right-4 sm:-right-6 bottom-[22%] sm:bottom-24 sm:bottom-28 bg-white rounded-2xl shadow-xl shadow-neutral-900/10 border border-neutral-100 p-3.5 sm:p-4 sm:p-5 w-[200px] sm:w-[230px] sm:w-[270px] backdrop-blur-sm">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <Award className="size-4 sm:size-5 text-secondary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12.5px] sm:text-[13px] font-semibold text-neutral-900 leading-snug">Industry Certification</p>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 leading-relaxed">Recognized credentials to boost your resume &amp; career</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 sm:-bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl shadow-neutral-900/10 border border-neutral-100 px-3.5 sm:px-4 sm:px-5 py-2.5 sm:py-3 sm:py-3.5 backdrop-blur-sm w-[92%] sm:w-auto">
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 sm:gap-5">
                  {courseIcons.map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex items-center gap-1.5 sm:gap-2">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center ${color}`}>
                        <Icon className="size-3.5 sm:size-4" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-neutral-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
