import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/common/Badge";
import { AdmissionInquiryForm } from "@/components/forms/AdmissionInquiryForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock3,
  CheckCircle2,
  ArrowLeft,
  Info,
} from "lucide-react";
import { instituteInfo } from "@/content/institute";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admission Inquiry",
  path: "/admissions/inquire",
  description:
    "Send an admission inquiry to Darbar Computer. Tell us about your goals and we'll help match you to the right course — free counseling, no commitments.",
});

const benefits = [
  "Free 1-on-1 career counseling session",
  "Free demo class before you enroll",
  "Honest course guidance, no pushy sales",
  "Transparent fees & installment options explained",
];

export default function AdmissionInquiryPage() {
  return (
    <>
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="pt-4 pb-8 sm:pb-10">
          <Breadcrumbs
            items={[
              { label: "Admissions" },
              { label: "Inquiry Form" },
            ]}
          />
          <div className="mt-2">
            <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-3">
              <ArrowLeft className="size-4" />
              Back to courses
            </Link>
          </div>
          <SectionHeading
            eyebrow="Admissions"
            title="Start Your Journey — Send an Inquiry"
            description="Tell us about your goals and we'll match you with the right course. Free counseling, free demo, no enrollment pressure."
            align="left"
            className="mx-0 mt-2"
          />
        </Container>
      </div>

      <section className="py-10 sm:py-14">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-3 mb-5 pb-5 border-b border-neutral-100">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                        Admission Inquiry Form
                      </h2>
                      <p className="mt-1 text-sm text-neutral-600">
                        All fields marked with <span className="text-destructive">*</span> are required.
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      <Info className="size-3 mr-1" />
                      Takes ~2 minutes
                    </Badge>
                  </div>
                  <Suspense fallback={<div className="py-12 text-center text-neutral-500">Loading form...</div>}>
                    <AdmissionInquiryForm />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            <aside className="lg:col-span-1 space-y-5">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-accent" />
                    Why Inquire?
                  </h3>
                  <ul className="space-y-2.5">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-neutral-700">
                        <CheckCircle2 className="size-4 text-accent shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-neutral-900">Contact Directly</h3>
                  <Separator />
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2.5">
                      <PhoneCall className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-neutral-500 font-medium">Call / WhatsApp</div>
                        <a href={`tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, "")}`} className="font-medium text-neutral-900 hover:text-primary">
                          {instituteInfo.contact.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Mail className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-neutral-500 font-medium">Email</div>
                        <a href={`mailto:${instituteInfo.contact.email}`} className="font-medium text-neutral-900 hover:text-primary break-all">
                          {instituteInfo.contact.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-neutral-500 font-medium">Visit us</div>
                        <span className="text-neutral-700 leading-relaxed">{instituteInfo.contact.address}</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Clock3 className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-neutral-500 font-medium">Hours</div>
                        <div className="text-neutral-700 space-y-0.5 text-xs leading-relaxed">
                          {instituteInfo.hours.map((h, i) => (
                            <div key={i} className="flex justify-between gap-3">
                              <span>{h.day}</span>
                              <span className="text-neutral-500">{h.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
