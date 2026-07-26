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
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { instituteInfo } from "@/content/institute";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/common/Badge";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { DarbarTechLogo } from "@/components/common/DarbarTechLogo";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Share2,
  instagram: Image,
  youtube: PlayCircle,
  linkedin: Briefcase,
};

export function Footer() {
  const year = new Date().getFullYear();
  const quickLinks = NAV_LINKS.filter((l) => l.href !== "/");
  const featuredCourses = ["computer-fundamentals-ms-office", "web-development-foundations", "full-stack-web-development", "graphic-design-photoshop-illustrator"];
  const courseNames: Record<string, string> = {
    "computer-fundamentals-ms-office": "Computer Fundamentals & MS Office",
    "web-development-foundations": "Web Development Foundations",
    "full-stack-web-development": "Full-Stack Web Development",
    "graphic-design-photoshop-illustrator": "Graphic Design",
  };

  return (
    <footer className="relative bg-neutral-950 text-neutral-300 pt-16 pb-8 mt-auto" role="contentinfo">
      <div className="absolute inset-0 top-0 h-1 gradient-primary" aria-hidden="true" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <DarbarTechLogo size="lg" variant="dark" />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5 max-w-xs">
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
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="size-4" aria-hidden="true" />
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
                    className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
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
              {featuredCourses.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/courses/${slug}`}
                    className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-secondary shrink-0" aria-hidden="true" />
                    {courseNames[slug]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                >
                  View all courses →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact & Hours
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="size-4 mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <span className="text-neutral-400 leading-relaxed">{instituteInfo.contact.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="size-4 mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <a href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`} className="text-neutral-400 hover:text-white transition-colors">
                  {instituteInfo.contact.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="size-4 mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <a href={`mailto:${instituteInfo.contact.email}`} className="text-neutral-400 hover:text-white transition-colors break-all">
                  {instituteInfo.contact.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="size-4 mt-0.5 shrink-0 text-secondary" aria-hidden="true" />
                <ul className="space-y-1 text-neutral-400">
                  {instituteInfo.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-4">
                      <span className="shrink-0">{h.day}</span>
                      <span className="text-neutral-500">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <NewsletterSignup />
        </div>

        <Separator className="my-8 border-neutral-800" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 leading-relaxed">
            © {year} {SITE_CONFIG.name}. All rights reserved.{" "}
            <Badge variant="outline" className="ml-2 align-middle text-[10px]">
              [DRAFT / PLACEHOLDER CONTENT]
            </Badge>
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
            <Link href="/about" className="hover:text-neutral-300 transition-colors">
              About Us
            </Link>
            <Link href="/faq" className="hover:text-neutral-300 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="hover:text-neutral-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
