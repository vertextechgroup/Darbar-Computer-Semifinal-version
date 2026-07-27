import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqCategories } from "@/content/faq";

interface FAQAccordionProps {
  compact?: boolean;
}

export function FAQAccordion({ compact = false }: FAQAccordionProps) {
  const allItems = faqCategories.flatMap((c) => c.items);
  const showCats = !compact && faqCategories.length > 1;

  return (
    <section aria-labelledby="faq-heading" className={`section-padding ${compact ? "bg-white" : "bg-white"}`}>
      <Container size="md">
        {!compact && (
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Answers to common questions about admissions, fees, classes, and certification."
            className="mb-10 sm:mb-12"
          />
        )}
        {showCats ? (
          <div className="space-y-7 sm:space-y-10">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-sm font-semibold text-primary mb-2.5 sm:mb-3 uppercase tracking-wider">
                  {cat.category}
                </h3>
                <Accordion type="single" className="rounded-2xl border border-neutral-200 bg-white p-1.5 sm:p-3 shadow-sm transition-all duration-300 hover:shadow-md">
                  {cat.items.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-[14px] sm:text-[15px] font-medium text-neutral-900 py-3 sm:py-3.5 px-2.5 sm:px-3 transition-colors duration-200 hover:text-primary text-left leading-snug">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-2.5 sm:px-3 pb-3.5 sm:pb-4">
                        <p className="text-sm sm:text-[15px] leading-relaxed">
                          {item.answer}
                          {item.isPlaceholder && (
                            <span className="ml-1 inline-block text-xs font-medium uppercase tracking-wide text-neutral-400">
                              [*verify before publishing]
                            </span>
                          )}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        ) : (
          <Accordion type="single" className="rounded-2xl border border-neutral-200 bg-white p-1.5 sm:p-2 sm:p-3 shadow-sm transition-all duration-300 hover:shadow-md">
            {allItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-[14px] sm:text-[15px] font-medium text-neutral-900 py-3 sm:py-3.5 px-2.5 sm:px-3 transition-colors duration-200 hover:text-primary text-left leading-snug">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-2.5 sm:px-3 pb-3.5 sm:pb-4">
                  <p className="text-sm sm:text-[15px] leading-relaxed">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Container>
    </section>
  );
}
