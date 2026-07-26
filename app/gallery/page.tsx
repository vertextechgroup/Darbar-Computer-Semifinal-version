import { GalleryClient } from "./GalleryClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  path: "/gallery",
  description:
    "Campus photos, labs, classes, events, and graduation ceremonies at Darbar Computer Training Institute.",
});

export default function GalleryPage() {
  return <GalleryClient />;
}
