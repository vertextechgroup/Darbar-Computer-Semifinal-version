import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";
import type { Course } from "@/types/course";
import type { BlogPostFrontmatter } from "@/types/blog-post";

export function buildMetadata(
  overrides: Partial<Metadata> & { title: string; description?: string; path?: string; images?: string[] }
): Metadata {
  const url = `${SITE_CONFIG.url}${overrides.path ?? ""}`;
  const description = overrides.description ?? SITE_CONFIG.description;
  const pageTitle = overrides.title;
  const fullTitle = `${overrides.title} | ${SITE_CONFIG.name}`;
  const images = overrides.images ?? [SITE_CONFIG.ogImage];

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    keywords: overrides.keywords ?? [
      "computer training",
      "computer institute Nepal",
      "programming courses",
      "Darbar Computer",
      "IT training Kathmandu",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
      creator: SITE_CONFIG.twitter.handle,
      site: SITE_CONFIG.twitter.site,
    },
    ...overrides,
    title: pageTitle,
    description,
  };
}

export function courseJsonLd(course: Course) {
  const weeksMatch = course.duration.match(/(\d+)/);
  const weeks = weeksMatch ? parseInt(weeksMatch[1], 10) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.shortDescription,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name,
      address: SITE_CONFIG.address,
    },
    numberOfCredits: weeks,
    courseCode: course.slug,
    educationalLevel: course.level,
    coursePrerequisites: course.targetStudents,
    skill: course.skillsGained.join(", "),
    instructorCredential: course.instituteCertificate,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.learningMode.includes("Physical") ? "InPerson" : "Online",
      duration: weeks ? `P${weeks}W` : undefined,
    },
  };
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: SITE_CONFIG.address,
  };
}

export function blogPostJsonLd(post: BlogPostFrontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    image: post.cover,
    keywords: post.tags?.join(", "),
    publisher: {
      "@type": "EducationalOrganization",
      name: SITE_CONFIG.name,
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
