import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { Button } from "@/components/ui/button";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { MessageSquare } from "lucide-react";
import { faqCategories } from "@/content/faq";

function QuestionMark() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <MessageSquare className="size-6" />
    </div>
  );
}

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  path: "/faq",
  description:
    "Answers on admissions, fees, installments, certification, and batch scheduling at DarbarTech Kathmandu.",
});

export default function FAQPage() {
  const allFaqs = faqCategories.flatMap((c) => c.items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(allFaqs.map((f) => ({ question: f.question, answer: f.answer })))),
        }}
      />
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="pt-4 pb-10 sm:pb-14">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <div className="mt-4">
            <SectionHeading
              eyebrow="Support"
              title="Frequently Asked Questions"
              description="Everything you want to know before enrolling — compiled from our most common student questions."
              className="mt-2"
            />
          </div>
        </Container>
      </div>

      <div className="pt-4" />
      <FAQAccordion compact={false} />

      <section className="py-14">
        <Container size="md">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 sm:p-10 text-center shadow-sm">
            <div className="mx-auto mb-4">
            <QuestionMark />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 text-balance">
              Still have questions?
            </h2>
            <p className="mt-3 text-neutral-700 max-w-xl mx-auto leading-relaxed">
              Can&apos;t find an answer above? Our team is happy to help. Reach out directly or send us a message anytime.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <Button size="lg">
              Contact Us
                </Button>
              </Link>
              <Link href="/admissions/inquire">
                <Button variant="outline" size="lg">
                  Talk to a Counselor
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
