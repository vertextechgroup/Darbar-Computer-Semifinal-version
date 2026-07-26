"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock, CalendarDays, ArrowUpRight, Wallet, Users, Award, Briefcase } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/course";
import { formatFee } from "@/content/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="group h-full flex flex-col overflow-hidden">
      <Link
        href={`/courses/${course.slug}`}
        className="relative block overflow-hidden aspect-[16/10] bg-neutral-100"
        aria-label={`${course.title} - View details`}
      >
        <Image
          src={course.image}
          alt={`${course.title} - DarbarTech course`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between gap-2">
          {course.featured && (
            <Badge variant="secondary" className="shadow-sm">
              Popular
            </Badge>
          )}
          <Badge variant="outline" className="bg-white/95 backdrop-blur-xs">
            {course.level}
          </Badge>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        />
      </Link>

      <CardContent className="flex-1 pt-5 pb-2 flex flex-col">
        <div className="flex items-center gap-2 mb-2 text-xs flex-wrap">
          <Badge variant="default">{course.category}</Badge>
          {course.internship && (
            <Badge variant="success" className="gap-1">
              <Briefcase className="size-3" aria-hidden="true" />
              Internship
            </Badge>
          )}
          {course.seats && (
            <span className="text-neutral-500 flex items-center gap-1">
              <Users className="size-3" aria-hidden="true" />
              {course.seats}
            </span>
          )}
        </div>
        <Link
          href={`/courses/${course.slug}`}
          className="font-semibold text-[17px] tracking-tight text-neutral-900 hover:text-primary transition-colors line-clamp-2 leading-snug"
        >
          {course.title}
        </Link>
        <p className="mt-1 text-sm text-secondary font-medium line-clamp-1">
          {course.tagline}
        </p>
        <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">
          {course.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-primary" aria-hidden="true" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" aria-hidden="true" />
            {course.timing.split("/").slice(0, 1).map((s) => s.trim()).join(", ")}
          </span>
          {course.industryCertification && (
            <span className="inline-flex items-center gap-1.5">
              <Award className="size-3.5 text-primary" aria-hidden="true" />
              <span className="truncate max-w-[120px]">{course.industryCertification}</span>
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-5 flex items-center justify-between gap-3 border-t border-neutral-100 mt-2">
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-1.5">
            <Wallet className="size-3.5 text-neutral-400" aria-hidden="true" />
            <span className="text-lg font-bold text-neutral-900">{formatFee(course.feeNPR)}</span>
          </div>
          {course.feeNote && (
            <span className="text-[11px] text-neutral-500">{course.feeNote}</span>
          )}
        </div>
        <Link href={`/courses/${course.slug}`} className="shrink-0 group/btn">
          <Button size="sm" className="w-full">
            View Details
            <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
