import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  ArrowRight,
  Wallet,
  Users,
  GraduationCap,
  Award,
  Briefcase,
  MapPin,
  RefreshCw,
  Sparkles,
  FolderKanban,
  TrendingUp,
  Wrench,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CourseCard } from "@/components/sections/CourseCard";
import { courses, getCourseBySlug, getRelatedCourses, formatFee } from "@/content/courses";
import { EVERY_COURSE_INCLUDES } from "@/lib/constants";
import { buildMetadata, courseJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return buildMetadata({ title: "Course Not Found", path: `/courses/${slug}` });
  }
  return buildMetadata({
    title: course.title,
    description: course.shortDescription,
    path: `/courses/${course.slug}`,
    images: [course.image],
    keywords: [course.title, course.category, course.level, ...course.skillsGained, "Darbar Computer course"],
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const related = getRelatedCourses(course, 3);
  const jsonLd = courseJsonLd(course);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="pt-4 pb-8 sm:pb-10">
          <Breadcrumbs
            items={[
              { label: "Courses", href: "/courses" },
              {
                label: course.category,
                href: `/courses?category=${encodeURIComponent(course.category)}`,
              },
              { label: course.title },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="default">{course.category}</Badge>
            <Badge variant="outline">{course.level}</Badge>
            {course.featured && <Badge variant="secondary">Featured</Badge>}
            {course.internship && (
              <Badge variant="success" className="gap-1">
                <Briefcase className="size-3" />
                {course.internship}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 text-balance max-w-4xl">
            {course.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg font-semibold text-secondary leading-relaxed max-w-3xl text-pretty">
            {course.tagline}
          </p>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 leading-relaxed max-w-3xl text-pretty">
            {course.shortDescription}
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
            <Card>
              <CardContent className="p-3 sm:p-4">
                <CalendarDays className="size-5 text-primary mb-1.5" />
                <div className="text-[11px] sm:text-xs text-neutral-500 font-medium">Duration</div>
                <div className="mt-0.5 text-sm sm:text-base font-bold text-neutral-900">{course.duration}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4">
                <Clock className="size-5 text-primary mb-1.5" />
                <div className="text-[11px] sm:text-xs text-neutral-500 font-medium">Class Timing</div>
                <div className="mt-0.5 text-sm sm:text-base font-bold text-neutral-900 leading-tight">{course.timing.split(" / ")[0]}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4">
                <MapPin className="size-5 text-primary mb-1.5" />
                <div className="text-[11px] sm:text-xs text-neutral-500 font-medium">Learning Mode</div>
                <div className="mt-0.5 text-sm sm:text-base font-bold text-neutral-900 leading-tight">{course.learningMode.split(" / ").slice(0, 2).join("/")}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4">
                <RefreshCw className="size-5 text-primary mb-1.5" />
                <div className="text-[11px] sm:text-xs text-neutral-500 font-medium">New Batch</div>
                <div className="mt-0.5 text-sm sm:text-base font-bold text-neutral-900 leading-tight">{course.newBatch}</div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>

      <section className="py-10 sm:py-14">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 aspect-[16/9]">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" aria-hidden="true">
                  <GraduationCap className="size-20 text-primary/30" />
                </div>
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover bg-neutral-100"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" aria-hidden="true" />
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 sm:w-auto sm:inline-flex">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills &amp; Tools</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio &amp; Career</TabsTrigger>
                  <TabsTrigger value="fees">Fees &amp; Batches</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <article className="prose prose-neutral max-w-none">
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 flex items-center gap-2">
                      <BookOpen className="size-5 text-primary" />
                      About this course
                    </h3>
                    <p className="text-neutral-700 leading-relaxed text-[15px] whitespace-pre-line">
                      {course.shortDescription} {course.tagline} Designed for {course.targetStudents.toLowerCase()}.
                    </p>

                    <Separator className="my-6" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-neutral-200 bg-white p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="size-5 text-primary" />
                          <h4 className="text-sm font-semibold text-neutral-900">Credentials</h4>
                        </div>
                        <ul className="space-y-2 text-[15px]">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="size-4 text-accent mt-0.5 shrink-0" />
                            <span className="text-neutral-700">
                              <strong>Institute Certificate:</strong> {course.instituteCertificate}
                            </span>
                          </li>
                          {course.industryCertification && (
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="size-4 text-accent mt-0.5 shrink-0" />
                              <span className="text-neutral-700">
                                <strong>Industry Pathway:</strong> {course.industryCertification}
                              </span>
                            </li>
                          )}
                          {course.internship && (
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="size-4 text-accent mt-0.5 shrink-0" />
                              <span className="text-neutral-700">
                                <strong>Internship:</strong> {course.internship}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-neutral-200 bg-white p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="size-5 text-primary" />
                          <h4 className="text-sm font-semibold text-neutral-900">Ideal For</h4>
                        </div>
                        <p className="text-[15px] text-neutral-700 leading-relaxed mb-3">{course.targetStudents}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {course.targetStudents.split(", ").map((t) => (
                            <Badge key={t} variant="outline" className="text-xs">
                              {t.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <h4 className="text-base font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                      <Sparkles className="size-5 text-secondary" />
                      Every Course Includes
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {EVERY_COURSE_INCLUDES.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 rounded-lg bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700"
                        >
                          <CheckCircle2 className="size-4 text-accent shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </TabsContent>

                <TabsContent value="skills">
                  <div className="space-y-6">
                    <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="size-5 text-primary" />
                        <h3 className="text-lg font-semibold text-neutral-900">Skills You&apos;ll Gain</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {course.skillsGained.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-start gap-2.5 rounded-lg bg-neutral-50 p-3"
                          >
                            <CheckCircle2 className="size-4.5 text-accent mt-0.5 shrink-0" />
                            <span className="text-[15px] text-neutral-700 leading-relaxed">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Wrench className="size-5 text-primary" />
                        <h3 className="text-lg font-semibold text-neutral-900">Software &amp; Tools</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {course.softwareTools.map((tool) => (
                          <Badge
                            key={tool}
                            variant="default"
                            className="px-3.5 py-1.5 text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="portfolio">
                  <div className="space-y-6">
                    <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FolderKanban className="size-5 text-primary" />
                        <h3 className="text-lg font-semibold text-neutral-900">Portfolio Projects</h3>
                        <span className="text-xs text-neutral-500 font-normal">Real, job-ready work</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {course.portfolioProjects.map((project, i) => (
                          <div
                            key={project}
                            className="flex items-start gap-3 rounded-lg border border-neutral-100 bg-neutral-50 p-4"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-white text-xs font-bold">
                              {i + 1}
                            </span>
                            <div>
                              <div className="text-[15px] font-semibold text-neutral-900">{project}</div>
                              <div className="text-xs text-neutral-500 mt-0.5">
                                Hands-on project built during the course
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="size-5 text-primary" />
                        <h3 className="text-lg font-semibold text-neutral-900">Career Opportunities</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {course.careerOpportunities.map((role) => (
                          <div
                            key={role}
                            className="flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-secondary/5 to-transparent border border-secondary/15 p-3"
                          >
                            <Briefcase className="size-4.5 text-secondary shrink-0" />
                            <span className="text-[15px] font-medium text-neutral-800 leading-relaxed">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="fees">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <Wallet className="size-6 text-primary mb-3" />
                        <div className="text-sm text-neutral-500 font-medium">
                          Course Fee
                        </div>
                        <div className="mt-1 text-3xl font-extrabold text-neutral-900">
                          {formatFee(course.feeNPR)}
                        </div>
                        {course.feeNote && (
                          <p className="mt-2 text-sm text-neutral-600">
                            {course.feeNote}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <CalendarDays className="size-6 text-primary mb-3" />
                        <div className="text-sm text-neutral-500 font-medium">Duration</div>
                        <div className="mt-1 text-3xl font-extrabold text-neutral-900">
                          {course.duration}
                        </div>
                        <p className="mt-2 text-sm text-neutral-600">
                          <Clock className="size-3.5 inline mr-1 -mt-0.5" />
                          {course.timing}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <RefreshCw className="size-6 text-primary mb-3" />
                        <div className="text-sm text-neutral-500 font-medium">Batch Schedule</div>
                        <div className="mt-1 text-2xl font-extrabold text-neutral-900">
                          {course.newBatch}
                        </div>
                        <p className="mt-2 text-sm text-neutral-600">
                          <MapPin className="size-3.5 inline mr-1 -mt-0.5" />
                          {course.learningMode}
                        </p>
                      </CardContent>
                    </Card>
                    {course.seats && (
                      <Card>
                        <CardContent className="p-6 flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <Users className="size-6 text-secondary" />
                            <div>
                              <div className="text-sm text-neutral-500 font-medium">
                                Seats
                              </div>
                              <div className="font-semibold text-neutral-900">
                                {course.seats}
                              </div>
                            </div>
                          </div>
                          <Award className="size-6 text-neutral-300" />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-5">
                <Card className="shadow-md overflow-hidden">
                  <div className="h-1.5 gradient-primary w-full" />
                  <CardContent className="p-6 space-y-5">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Enrollment Fee
                      </div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-neutral-900">
                          {formatFee(course.feeNPR)}
                        </span>
                        <span className="text-sm text-neutral-500">
                          / {course.duration}
                        </span>
                      </div>
                      {course.feeNote && (
                        <p className="mt-1 text-xs text-neutral-500">{course.feeNote}</p>
                      )}
                    </div>
                    <Separator />
                    <ul className="space-y-2.5 text-sm text-neutral-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        {course.duration} · {course.level} level
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        {course.learningMode.split(" / ")[0]} batches
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        {course.instituteCertificate} on completion
                      </li>
                      {course.industryCertification && (
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-accent shrink-0" />
                          {course.industryCertification} pathway
                        </li>
                      )}
                      {course.internship && (
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-accent shrink-0" />
                          {course.internship}
                        </li>
                      )}
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" />
                        Small class sizes · Lab time included
                      </li>
                    </ul>
                    <div className="space-y-2.5 pt-1">
                      <Link
                        href={`/admissions/inquire?course=${encodeURIComponent(course.slug)}`}
                      >
                        <Button size="lg" className="w-full shadow-lg shadow-primary/20">
                          Enquire About This Course
                          <ArrowRight className="size-4" />
                        </Button>
                      </Link>
                      <Link href="/admissions/inquire">
                        <Button variant="outline" size="lg" className="w-full">
                          Book Free Demo Class
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-14 sm:py-20 bg-neutral-50 border-t border-neutral-200">
          <Container size="xl">
            <SectionHeading
              eyebrow="Related Courses"
              title={`More in ${course.category}`}
              description="Students who viewed this course also explored these similar programs."
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
