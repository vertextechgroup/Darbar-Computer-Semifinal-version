"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Image as ImageIcon, Calendar, ArrowRight, X } from "lucide-react";
import { GALLERY_CATEGORIES, getImagesByCategory, galleryImages, type GalleryImage, type GalleryCategory } from "@/content/gallery";

export function GalleryClient() {
  const [activeCategory, setActiveCategory] = React.useState<GalleryCategory>("All");
  const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);

  const images = getImagesByCategory(activeCategory);
  const counts = React.useMemo(() => {
    const map: Record<string, number> = { All: galleryImages.length };
    GALLERY_CATEGORIES.forEach((c) => {
      if (c !== "All") map[c] = galleryImages.filter((g) => g.category === c).length;
    });
    return map;
  }, []);

  return (
    <>
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="pt-4 pb-8 sm:pb-12">
          <Breadcrumbs items={[{ label: "Gallery" }]} />
          <SectionHeading
            eyebrow="Photo Gallery"
            title="Life at Darbar Computer"
            description="Glimpses of our campus, labs, classes, events, and the moments our students and graduates share."
            className="mt-2"
          />
        </Container>
      </div>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <Tabs
            defaultValue="All"
            value={activeCategory}
            onValueChange={(v) => setActiveCategory(v as GalleryCategory)}
            className="w-full"
          >
            <div className="sticky top-[73px] z-20 -mx-4 px-4 pb-4 bg-gradient-to-b from-background via-background to-transparent">
              <TabsList className="flex-wrap h-auto gap-1 p-2 min-h-[48px]">
                {GALLERY_CATEGORIES.map((cat) => (
                  <TabsTrigger key={cat} value={cat}>
                    {cat}
                    <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-neutral-200 px-1.5 text-[11px] font-semibold text-neutral-700 data-[state=active]:bg-primary/15 data-[state=active]:text-primary">
                      {counts[cat] ?? 0}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {GALLERY_CATEGORIES.map((cat) => (
              <TabsContent key={cat} value={cat}>
                {cat !== "All" && cat !== activeCategory ? null : (
                  <>
                    {images.length === 0 ? (
                      <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-12 sm:p-16 text-center">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
                          <ImageIcon className="size-7" />
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900">
                          No photos in this category yet
                        </h3>
                        <p className="mt-2 text-neutral-600 max-w-md mx-auto leading-relaxed">
                          New photos are added after every event and batch ceremony. Check back soon.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {images.map((img, idx) => {
                          const spanLarge = idx % 7 === 0;
                          return (
                            <button
                              key={img.id}
                              type="button"
                              onClick={() => setSelectedImage(img)}
                              className={`group relative overflow-hidden rounded-xl bg-neutral-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 ${
                                spanLarge
                                  ? "col-span-2 sm:col-span-2 aspect-[16/10]"
                                  : "aspect-square sm:aspect-[4/3]"
                              }`}
                              aria-label={`Open photo: ${img.title ?? img.alt}`}
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                  ((e.currentTarget as HTMLImageElement).style.display = "none");
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center text-primary-foreground p-4">
                                  <ImageIcon className="size-12 mx-auto text-neutral-200 opacity-80" />
                                  {img.isPlaceholder && (
                                    <Badge variant="outline" className="mt-3 bg-white/90 text-neutral-700 border-neutral-300 text-[10px]">
                                      PLACEHOLDER
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all text-left">
                                {img.title && (
                                  <p className="text-white font-semibold text-[13px] sm:text-sm leading-tight line-clamp-2">
                                    {img.title}
                                  </p>
                                )}
                                {img.date && (
                                  <p className="text-white/75 text-[11px] sm:text-xs mt-1 inline-flex items-center gap-1.5">
                                    <Calendar className="size-3" aria-hidden="true" />
                                    {new Date(img.date).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </section>

      <section className="pb-20">
        <Container size="md">
          <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 text-balance">
              Want to be in our next gallery post?
            </h2>
            <p className="mt-3 text-neutral-700 leading-relaxed max-w-lg mx-auto text-pretty">
              Join a course, attend an open house, or book a campus tour — and be part of the next
              batch of Darbar Computer memories.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20">
                  Explore Courses
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/admissions/inquire">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Book a Campus Tour
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={(o) => !o && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-5xl p-0 gap-0 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_280px]">
            <div className="relative bg-neutral-900 aspect-[4/3] sm:aspect-auto sm:min-h-[500px]">
              {selectedImage && (
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                  onError={(e) => {
                    ((e.currentTarget as HTMLImageElement).style.display = "none");
                  }}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <ImageIcon className="size-20 text-white/30" />
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close preview"
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
              >
                <X className="size-5" />
              </button>
              {selectedImage?.isPlaceholder && (
                <Badge variant="outline" className="absolute top-3 left-3 bg-white/95 text-neutral-700 border-neutral-300 text-[10px]">
                  PLACEHOLDER
                </Badge>
              )}
            </div>
            <div className="flex flex-col p-6">
              <DialogHeader className="text-left">
                <DialogTitle className="text-xl font-bold tracking-tight">
                  {selectedImage?.title ?? "Gallery Photo"}
                </DialogTitle>
                <DialogDescription className="mt-1.5 text-neutral-600 leading-relaxed">
                  {selectedImage?.alt}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-5 space-y-3">
                {selectedImage?.category && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-500 shrink-0">Category</span>
                    <Badge variant="default">{selectedImage.category}</Badge>
                  </div>
                )}
                {selectedImage?.date && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-500 shrink-0 min-w-[72px]">Date</span>
                    <span className="inline-flex items-center gap-1.5 text-neutral-700">
                      <Calendar className="size-3.5 text-primary" aria-hidden="true" />
                      {new Date(selectedImage.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-auto pt-6 space-y-2">
                <Link href="/events" onClick={() => setSelectedImage(null)}>
                  <Button variant="outline" className="w-full">
                    See Related Events
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link href="/admissions/inquire" onClick={() => setSelectedImage(null)}>
                  <Button className="w-full">
                    Join a Course
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
