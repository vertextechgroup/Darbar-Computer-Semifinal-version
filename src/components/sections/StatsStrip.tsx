import { Container } from "@/components/common/Container";
import { instituteInfo } from "@/content/institute";
import { Award, Users, BookOpenCheck, GraduationCap } from "lucide-react";

const icons = [Award, Users, BookOpenCheck, GraduationCap];

export function StatsStrip() {
  return (
    <section aria-labelledby="stats-heading" className="py-10 sm:py-12 bg-neutral-50 border-y border-neutral-200">
      <Container size="xl">
        <h2 id="stats-heading" className="sr-only">
          Institute at a Glance
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-8">
          {instituteInfo.stats.map((stat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center text-center rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 mb-2 sm:mb-3">
                  <Icon className="size-5 sm:size-6" aria-hidden="true" />
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                  {stat.value}
                  {stat.isPlaceholder && <span className="text-xs sm:text-sm align-super text-neutral-400 ml-0.5">*</span>}
                </div>
                <div className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-neutral-600 leading-tight">
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
