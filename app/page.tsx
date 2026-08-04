import { Hero } from "@/components/sections/Hero";
import { CourseGrid } from "@/components/sections/CourseGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { getFeaturedCourses } from "@/content/courses";
import { buildMetadata } from "@/lib/seo";
import { orgJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Computer Training Institute in Kathmandu — 37 Courses",
  path: "/",
  description:
    "Programming, web development, AI, design, networking & more. Certified trainers, small batches, real projects. Book a free consultation.",
  keywords: [
    "computer training",
    "computer institute Nepal",
    "programming courses",
    "Darbar Computer",
    "IT training Kathmandu",
    "computer training institute Kathmandu",
    "computer courses in Nepal",
    "hands-on IT training",
  ],
});

export default function HomePage() {
  const featuredCourses = getFeaturedCourses(6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />
      <Hero />
      <CourseGrid
        courses={featuredCourses}
        eyebrow="Popular Courses"
        title="Our Most-Loved Courses"
        description="Hand-picked programs our students enroll in the most — entry-level foundations to flagship career paths."
      />
      <WhyChooseUs />

      <TestimonialCarousel />
      <FAQAccordion compact />
    </>
  );
}
