import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/common/Badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowRight, User, ArrowLeft, Tag } from "lucide-react";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/content/blog-posts";
import { buildMetadata, blogPostJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return buildMetadata({
      title: "Post Not Found",
      path: `/blog/${slug}`,
    });
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    images: [post.cover],
    keywords: post.tags,
  });
}

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:mt-6 prose-h3:mb-3 prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:my-4 prose-li:text-neutral-700 prose-li:my-1 prose-ul:my-4 prose-ol:my-4 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-neutral-600 prose-strong:text-neutral-900 prose-a:text-primary prose-a:underline prose-a:underline-offset-2 prose-table:w-full prose-table:my-6 prose-th:bg-neutral-50 prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-neutral-200 prose-td:p-3 prose-td:border prose-td:border-neutral-200 prose-hr:my-8 prose-hr:border-neutral-200">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="scroll-mt-24">
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="scroll-mt-24">
              {trimmed.slice(4)}
            </h3>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={idx} className="scroll-mt-24">
              {trimmed.slice(2)}
            </h1>
          );
        }
        if (trimmed.startsWith("| ")) {
          return (
            <div key={idx} className="overflow-x-auto my-4">
              <table className="min-w-full text-sm border-collapse">
                <tbody>
                  <tr>
                    {trimmed
                      .split("|")
                      .filter((c) => c.trim())
                      .map((cell, ci) => (
                        <td
                          key={ci}
                          className="border border-neutral-200 px-3 py-2 text-neutral-700"
                        >
                          {cell.trim()}
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
        if (trimmed.startsWith("- ")) {
          return (
            <ul key={idx} className="list-disc pl-6 my-2 space-y-1">
              <li className="text-neutral-700 leading-relaxed">{trimmed.slice(2)}</li>
            </ul>
          );
        }
        if (trimmed.startsWith("---")) {
          return <hr key={idx} className="my-8 border-neutral-200" />;
        }
        if (trimmed.startsWith(">")) {
          return (
            <blockquote key={idx} className="border-l-4 border-primary pl-4 italic text-neutral-600 my-4">
              {trimmed.slice(1).trim()}
            </blockquote>
          );
        }
        if (trimmed === "") {
          return <div key={idx} className="h-2" />;
        }
        const isBoldItalic = trimmed.startsWith("*") && trimmed.endsWith("*");
        return (
          <p key={idx} className={`text-neutral-700 leading-relaxed my-3 ${isBoldItalic ? "text-sm text-neutral-500 italic" : ""}`}>
            {trimmed}
          </p>
        );
      })}
    </article>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd(post)) }}
      />
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container size="xl" className="pt-4 pb-8 sm:pb-12">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
          <div className="mt-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.tags?.map((t) => (
                <Badge key={t} variant="default">
                  <Tag className="size-3" aria-hidden="true" />
                  {t}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-tight text-balance">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-neutral-700 leading-relaxed text-pretty">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-600">
              <span className="inline-flex items-center gap-2">
                <User className="size-4 text-primary" aria-hidden="true" />
                <span className="font-medium">{post.author}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4 text-primary" aria-hidden="true" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-primary" aria-hidden="true" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </Container>
      </div>

      <section className="py-10 sm:py-14">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-14">
            <div className="min-w-0">
              <div className="relative rounded-2xl border border-neutral-200 overflow-hidden aspect-[16/9] mb-10 bg-neutral-100">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                  priority
                />
              </div>

              <SimpleMarkdown content={post.content} />

              <Separator className="my-10" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link href="/blog">
                  <Button variant="outline">
                    <ArrowLeft className="size-4" />
                    Back to Blog
                  </Button>
                </Link>
                <div>
                  <Link href="/admissions/inquire">
                    <Button>
                      Talk to a Counselor
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] space-y-6 self-start">
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-neutral-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 border-primary/20">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-neutral-900 mb-2">Enjoyed this article?</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    Talk to a counselor about the courses and topics mentioned in this post. Free,
                    no-obligation guidance.
                  </p>
                  <Link href="/admissions/inquire">
                    <Button className="w-full">
                      Free Counseling
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-14 sm:py-16 bg-neutral-50 border-t border-neutral-200">
          <Container size="xl">
            <div className="flex items-end justify-between mb-8">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Keep Reading
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                  Related Articles
                </h2>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex">
                <Button variant="ghost" size="sm" className="group/btn">
                  View All
                  <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp) => (
                <Card key={rp.slug} className="group h-full flex flex-col overflow-hidden">
                  <Link
                    href={`/blog/${rp.slug}`}
                    className="relative block overflow-hidden aspect-[16/10] bg-neutral-100"
                  >
                    <Image
                      src={rp.cover}
                      alt={rp.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <CardContent className="flex-1 pt-5 pb-5 flex flex-col">
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      {rp.tags?.slice(0, 2).map((t) => (
                        <Badge key={t} variant="default">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${rp.slug}`}
                      className="font-semibold text-[16px] tracking-tight text-neutral-900 hover:text-primary transition-colors line-clamp-2 leading-snug"
                    >
                      {rp.title}
                    </Link>
                    <div className="mt-auto pt-4 flex items-center gap-x-3 text-xs text-neutral-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-primary" aria-hidden="true" />
                        {new Date(rp.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5 text-primary" aria-hidden="true" />
                        {rp.readingTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
