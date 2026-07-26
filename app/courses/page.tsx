import { Suspense } from "react";
import CoursesClient from "./CoursesClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Courses",
  path: "/courses",
  description:
    "Browse all 37 professional computer courses at Darbar Computer: basic computer, office, programming, web development, AI, data science, graphic design, accounting, networking, cybersecurity, and more.",
});

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-neutral-500">Loading course catalog...</div>
        </div>
      }
    >
      <CoursesClient />
    </Suspense>
  );
}
