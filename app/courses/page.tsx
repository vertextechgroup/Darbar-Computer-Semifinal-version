import { Suspense } from "react";
import CoursesClient from "./CoursesClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "All Courses — Programming, Design, AI & More",
  path: "/courses",
  description:
    "Browse 37 hands-on computer courses across 15 career fields in Kathmandu. Flexible batches, installment plans, career support.",
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
