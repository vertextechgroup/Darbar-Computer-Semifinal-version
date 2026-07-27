"use client";
import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Search,
  X,
  SlidersHorizontal,
  CheckCircle2,
  Sparkles,
  FolderKanban,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  FileText,
  Bot,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { CourseCard } from "@/components/sections/CourseCard";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/common/Badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { courses } from "@/content/courses";
import { COURSE_CATEGORIES, COURSE_LEVELS, EVERY_COURSE_INCLUDES } from "@/lib/constants";

const allCategories = ["All", ...COURSE_CATEGORIES];
const allLevels = ["All", ...COURSE_LEVELS];

const BENEFIT_ICONS: Record<string, React.ReactNode> = {
  "Live Projects": <Layers className="size-4" />,
  "Portfolio Building": <FolderKanban className="size-4" />,
  "Internship Support": <Briefcase className="size-4" />,
  "Job Interview Preparation": <Users className="size-4" />,
  "Career Counseling": <Award className="size-4" />,
  "LMS Access": <BookOpen className="size-4" />,
  "Lifetime Notes": <FileText className="size-4" />,
  "AI-Assisted Learning": <Bot className="size-4" />,
};

function CoursesClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialCategory = searchParams.get("category") ?? "All";
  const initialLevel = searchParams.get("level") ?? "All";
  const initialSearch = searchParams.get("search") ?? "";

  const [search, setSearch] = React.useState(initialSearch);
  const [category, setCategory] = React.useState(initialCategory);
  const [level, setLevel] = React.useState(initialLevel);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const syncToUrl = React.useCallback(
    (nextSearch: string, nextCategory: string, nextLevel: string) => {
      const params = new URLSearchParams();
      if (nextSearch) params.set("search", nextSearch);
      if (nextCategory && nextCategory !== "All") params.set("category", nextCategory);
      if (nextLevel && nextLevel !== "All") params.set("level", nextLevel);
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url, { scroll: false });
    },
    [router, pathname]
  );

  const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateSearch = (value: string) => {
    setSearch(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      syncToUrl(value, category, level);
    }, 350);
  };

  const updateCategory = (value: string) => {
    setCategory(value);
    syncToUrl(search, value, level);
  };

  const updateLevel = (value: string) => {
    setLevel(value);
    syncToUrl(search, category, value);
  };

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return courses.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (level !== "All" && c.level !== level) return false;
      if (q) {
        const haystack = [
          c.title,
          c.tagline,
          c.shortDescription,
          c.category,
          c.targetStudents,
          ...c.skillsGained,
          ...c.softwareTools,
          ...c.portfolioProjects,
          ...c.careerOpportunities,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, category, level]);

  const hasActiveFilters = category !== "All" || level !== "All" || search !== "";
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All");
    syncToUrl("", "All", "All");
  };

  return (
    <>
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="pt-4 pb-8 sm:pb-12">
          <Breadcrumbs items={[{ label: "Courses" }]} />
          <SectionHeading
            eyebrow="Course Catalog"
            title={`Browse ${courses.length} Professional Courses`}
            description="From beginner computer literacy to flagship advanced career paths. Filter by category, level, or search by name, skill, or career outcome."
            className="mt-2"
          />
        </Container>

        <Container size="xl" className="pb-10">
          <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-5 text-secondary shrink-0" />
              <h3 className="font-semibold text-neutral-900">
                Every Course Includes
              </h3>
              <span className="text-xs text-neutral-500 hidden sm:inline">
                Standard benefits across all 37 programs
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {EVERY_COURSE_INCLUDES.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 backdrop-blur-sm px-3 py-2.5 text-sm text-neutral-700 shadow-sm"
                >
                  <div className="text-primary shrink-0 flex items-center justify-center">
                    {BENEFIT_ICONS[item] ?? <CheckCircle2 className="size-4" />}
                  </div>
                  <span className="font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <section className="py-8 sm:py-10">
        <Container size="xl">
          <div className="sticky top-[73px] z-20 -mx-4 px-4 pb-4 bg-gradient-to-b from-background via-background to-transparent">
            <div className="rounded-xl border border-neutral-200 bg-white/95 backdrop-blur-sm shadow-sm">
              <div className="flex flex-col gap-3 p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                    <Input
                      type="search"
                      placeholder="Search by course, skill, tool, or career…"
                      value={search}
                      onChange={(e) => updateSearch(e.target.value)}
                      className="h-11 pl-10"
                      aria-label="Search courses"
                    />
                    {search && (
                        <button
                          type="button"
                          onClick={() => updateSearch("")}
                          aria-label="Clear search"
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                        >
                          <X className="size-4" />
                        </button>
                      )}
                  </div>

                  <div className="hidden md:flex items-center gap-3 flex-1">
                    <div className="flex-1">
                      <Select
                        value={category}
                        onChange={(e) => updateCategory(e.target.value)}
                        options={allCategories.map((c) => ({ value: c, label: c }))}
                      />
                    </div>
                    <div className="flex-1">
                      <Select
                        value={level}
                        onChange={(e) => updateLevel(e.target.value)}
                        options={allLevels.map((l) => ({ value: l, label: l }))}
                      />
                    </div>
                    {hasActiveFilters && (
                      <Button variant="ghost" onClick={clearFilters} size="sm">
                        <X className="size-4" />
                        Clear
                      </Button>
                    )}
                  </div>

                  <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                    <SheetTrigger>
                      <Button variant="outline" className="md:hidden w-full">
                        <SlidersHorizontal className="size-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
                      <SheetHeader>
                        <SheetTitle>Course Filters</SheetTitle>
                      </SheetHeader>
                      <div className="p-4 space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Category</label>
                          <Select
                            value={category}
                            onChange={(e) => updateCategory(e.target.value)}
                            options={allCategories.map((c) => ({ value: c, label: c }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Level</label>
                          <Select
                            value={level}
                            onChange={(e) => updateLevel(e.target.value)}
                            options={allLevels.map((l) => ({ value: l, label: l }))}
                          />
                        </div>
                        {hasActiveFilters && (
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              clearFilters();
                              setFiltersOpen(false);
                            }}
                          >
                            <X className="size-4" />
                            Clear All Filters
                          </Button>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">{filtered.length}</span> of{" "}
              {courses.length} courses
            </p>
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-1.5">
                {category !== "All" && (
                  <Badge variant="outline" className="gap-1.5">
                    {category}
                    <button
                      onClick={() => updateCategory("All")}
                      aria-label={`Remove ${category} filter`}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}
                {level !== "All" && (
                  <Badge variant="outline" className="gap-1.5">
                    {level}
                    <button
                      onClick={() => updateLevel("All")}
                      aria-label={`Remove ${level} filter`}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container size="xl">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-12 sm:p-16 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
                <Search className="size-7" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">No courses found</h3>
              <p className="mt-2 text-neutral-600 max-w-md mx-auto leading-relaxed">
                Try clearing some filters or search with a different keyword (try "Python", "design", or "freelancing").
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button onClick={clearFilters}>Clear Filters</Button>
                <Link href="/courses">
                  <Button variant="outline">Show All Courses</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course, i) => (
                <Reveal key={course.id} delay={Math.min(i * 70, 350)} y={18}>
                  <CourseCard course={course} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export default function CoursesClient() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-neutral-500">Loading course catalog...</div>
      </div>
    }>
      <CoursesClientPage />
    </Suspense>
  );
}
