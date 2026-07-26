import { Container } from "@/components/common/Container";
import { instituteInfo } from "@/content/institute";
import { Award, Users, BookOpenCheck, GraduationCap } from "lucide-react";

const icons = [Award, Users, BookOpenCheck, GraduationCap];

export function StatsStrip() {
  return (
    <section aria-labelledby="stats-heading" className="py-12 bg-neutral-50 border-y border-neutral-200">
      <Container size="xl">
        <h2 id="stats-heading" className="sr-only">
          Institute at a Glance
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {instituteInfo.stats.map((stat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center text-center rounded-2xl bg-white p-6 shadow-sm border border-neutral-200 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-3">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                  {stat.value}
                  {stat.isPlaceholder && <span className="text-sm align-super text-neutral-400 ml-0.5">*</span>}
                </div>
                <div className="mt-1.5 text-sm text-neutral-600 leading-tight">
                  {stat.label}
                  {stat.isPlaceholder && <span className="sr-only"> (illustrative figure)</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
