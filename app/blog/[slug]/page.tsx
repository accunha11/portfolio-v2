import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { HiOutlineDocumentText } from "react-icons/hi2"

import { Badge } from "@/components/ui/badge"
import { blogItems } from "@/app/blog/blog-posts"

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogItems.find((item) => item.slug === slug)

  if (!post) {
    notFound()
  }

  const paragraphs = post.details
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <article className="space-y-8">
        <header className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground">{post.subtitle}</p>
          </div>

          {(post.githubUrl || post.paperUrl) && (
            <div className="flex items-center gap-3">
              {post.githubUrl && (
                <a
                  href={post.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${post.title} GitHub repository`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <FaGithub className="size-5" />
                </a>
              )}
              {post.paperUrl && (
                <a
                  href={post.paperUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${post.title} paper`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <HiOutlineDocumentText className="size-5" />
                </a>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Badge variant="default">{post.category}</Badge>
            {post.skills.map((skill) => (
              <Badge key={`${post.slug}-${skill}`} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </header>

        <section className="space-y-5 leading-7 text-muted-foreground">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      </article>
    </main>
  )
}
