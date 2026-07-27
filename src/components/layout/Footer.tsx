import Link from "next/link";
import {
  Share2,
  Image,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Clock,
  PlayCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { instituteInfo } from "@/content/institute";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/common/Badge";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { DarbarTechLogo } from "@/components/common/DarbarTechLogo";
import { getFeaturedCourses } from "@/content/courses";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Share2,
  instagram: Image,
  youtube: PlayCircle,
  linkedin: Briefcase,
  whatsapp: MessageCircle,
};

export function Footer() {
  const year = new Date().getFullYear();
  const quickLinks = [
    ...NAV_LINKS.filter((l) => l.href !== "/"),
    { href: "/faq", label: "FAQ" },
  ];
  const featuredCourses = getFeaturedCourses(4);

  return (
    <footer className="relative bg-secondary/90 text-neutral-300 pt-12 sm:pt-16 pb-6 sm:pb-8 mt-auto" role="contentinfo">
      <div className="absolute inset-0 top-0 h-1 gradient-primary" aria-hidden="true" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1 sm:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group/link">
              <DarbarTechLogo size="lg" variant="dark" />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5 max-w-xs sm:max-w-sm">
              {instituteInfo.tagline} Professional computer courses for students, job seekers, and professionals in Nepal.
            </p>
            <div className="flex items-center gap-2">
              {instituteInfo.socials.map((s) => {
                const Icon = socialIconMap[s.icon] ?? Share2;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={`${SITE_CONFIG.name} on ${s.name}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-600/60 text-neutral-400 transition-all duration-200 ease-out hover:text-white hover:border-primary hover:bg-primary"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[36px] py-1 text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Popular Courses
            </h3>
            <ul className="space-y-2.5 text-sm">
              {featuredCourses.map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 min-h-[36px] py-1 text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span className="line-clamp-1">{course.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/courses"
                  className="group/link inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 min-h-[36px] py-1 transition-colors duration-200"
                >
                  View all courses
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact & Hours
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="size-4 mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-neutral-400 leading-relaxed">{instituteInfo.contact.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="size-4 mt-1 shrink-0 text-accent" aria-hidden="true" />
                <a href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`} className="text-neutral-400 hover:text-white min-h-[36px] py-0.5 transition-colors duration-200">
                  {instituteInfo.contact.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="size-4 mt-1 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${instituteInfo.contact.email}`} className="text-neutral-400 hover:text-white break-all min-h-[36px] py-0.5 transition-colors duration-200">
                  {instituteInfo.contact.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="size-4 mt-1 shrink-0 text-accent" aria-hidden="true" />
                <ul className="space-y-1.5 text-neutral-400 flex-1">
                  {instituteInfo.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-4 min-h-[28px] items-center">
                      <span className="shrink-0">{h.day}</span>
                      <span className="text-neutral-500">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <NewsletterSignup />
        </div>

        <Separator className="my-6 sm:my-8 border-neutral-700/50" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="text-xs text-neutral-500 leading-relaxed order-2 sm:order-1">
            © {year} {SITE_CONFIG.name}. All rights reserved.{" "}
            <Badge variant="outline" className="ml-2 align-middle text-[10px] border-neutral-600/40 text-neutral-400">
              [DRAFT / PLACEHOLDER CONTENT]
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-neutral-500 order-1 sm:order-2 w-full sm:w-auto">
            <Link href="/about" className="hover:text-neutral-300 min-h-[32px] inline-flex items-center transition-colors duration-200">
              About Us
            </Link>
            <Link href="/faq" className="hover:text-neutral-300 min-h-[32px] inline-flex items-center transition-colors duration-200">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-neutral-300 min-h-[32px] inline-flex items-center transition-colors duration-200">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="hover:text-neutral-300 min-h-[32px] inline-flex items-center transition-colors duration-200">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
