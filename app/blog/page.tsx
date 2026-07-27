import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { getAllBlogPosts, getAllTags } from "@/content/blog-posts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  path: "/blog",
  description:
    "Articles, guides, and student success stories from Darbar Computer. Career tips, programming tutorials, and insights from Nepal's computer training experts.",
});

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const tags = getAllTags();

  return (
    <>
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="pt-4 pb-8 sm:pb-12">
          <Breadcrumbs items={[{ label: "Blog" }]} />
          <SectionHeading
            eyebrow="Insights & Stories"
            title="From Our Blog"
            description="Career guides, programming tutorials, student success stories, and updates from the Darbar Computer community."
            className="mt-2"
          />
        </Container>
      </div>

      {tags.length > 0 && (
        <section className="py-6 border-b border-neutral-200 bg-white sticky top-[var(--header-h)] z-20">
          <Container size="xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="cursor-default">
                All Posts
              </Badge>
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="hover:bg-neutral-100 cursor-default">
                  {tag}
                </Badge>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-12 sm:py-16">
        <Container size="xl">
          {posts.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-12 sm:p-16 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
                <User className="size-7" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">No blog posts yet</h3>
              <p className="mt-2 text-neutral-600 max-w-md mx-auto leading-relaxed">
                Blog posts are being prepared. Check back soon for new articles, tutorials, and
                success stories.
              </p>
            </div>
          ) : (
            <>
              {posts[0] && (
                <div className="mb-10">
                  <Card className="group overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <Link
                        href={`/blog/${posts[0].slug}`}
                        className="relative block overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[360px] bg-neutral-100"
                        aria-label={`${posts[0].title} — Read more`}
                      >
                        <Image
                          src={posts[0].cover}
                          alt={`${posts[0].title} cover`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {posts[0].tags?.slice(0, 2).map((t) => (
                            <Badge key={t} variant="default">
                              {t}
                            </Badge>
                          ))}
                          <Badge variant="success">Featured</Badge>
                        </div>
                        <Link
                          href={`/blog/${posts[0].slug}`}
                          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 hover:text-primary transition-colors leading-tight"
                        >
                          {posts[0].title}
                        </Link>
                        <p className="mt-3 text-neutral-700 leading-relaxed line-clamp-3">
                          {posts[0].excerpt}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-primary" aria-hidden="true" />
                            {new Date(posts[0].date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="size-3.5 text-primary" aria-hidden="true" />
                            {posts[0].readingTime}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <User className="size-3.5 text-primary" aria-hidden="true" />
                            {posts[0].author}
                          </span>
                        </div>
                        <div className="mt-6">
                          <Link href={`/blog/${posts[0].slug}`}>
                            <Button size="lg">
                              Read Article
                              <ArrowRight className="size-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(1).map((post) => (
                  <Card key={post.slug} className="group h-full flex flex-col overflow-hidden">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative block overflow-hidden aspect-[16/10] bg-neutral-100"
                      aria-label={`${post.title} — Read more`}
                    >
                      <Image
                        src={post.cover}
                        alt={`${post.title} cover`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <CardContent className="flex-1 pt-5 pb-2 flex flex-col">
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        {post.tags?.slice(0, 2).map((t) => (
                          <Badge key={t} variant="default">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-semibold text-[17px] tracking-tight text-neutral-900 hover:text-primary transition-colors line-clamp-2 leading-snug"
                      >
                        {post.title}
                      </Link>
                      <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-neutral-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-primary" aria-hidden="true" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3.5 text-primary" aria-hidden="true" />
                          {post.readingTime}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 pb-5 flex items-center justify-between gap-3 border-t border-neutral-100 mt-2">
                      <span className="text-xs text-neutral-500 inline-flex items-center gap-1.5">
                        <User className="size-3.5" aria-hidden="true" />
                        {post.author}
                      </span>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="group/btn">
                          Read
                          <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
