import { MessageSquareText, Users, CreditCard, GraduationCap } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";

const steps = [
  {
    icon: MessageSquareText,
    title: "1. Inquire",
    description:
      "Browse our courses or get in touch with us. We'll match you to the right track based on your goals and background.",
  },
  {
    icon: Users,
    title: "2. Free Counseling & Demo",
    description:
      "One-on-one career counseling and a free demo class so you can see the teaching style, meet the trainer, and be sure before enrolling.",
  },
  {
    icon: CreditCard,
    title: "3. Enroll & Pay",
    description:
      "Simple enrollment. Installment plans available for eligible courses. Your batch and schedule are confirmed on enrollment.",
  },
  {
    icon: GraduationCap,
    title: "4. Start Learning",
    description:
      "Join regular classes, hands-on labs, and complete real projects. Receive your certificate and career support after graduation.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="section-padding">
      <Container size="xl">
        <SectionHeading
          eyebrow="Simple Process"
          title="Get Started in 4 Easy Steps"
          description="From first inquiry to graduation, our clear enrollment process keeps everything simple and transparent."
        />

        <div className="mt-14 relative">
          <div
            className="hidden lg:block absolute left-[12%] right-[12%] top-[52px] h-0.5 bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20"
            aria-hidden="true"
          />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-[104px] w-[104px] items-center justify-center rounded-full bg-white border-4 border-primary/10 shadow-sm group-hover:border-primary/30 transition-colors">
                    <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20">
                      <Icon className="size-8" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-neutral-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-xs">
                    {s.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
