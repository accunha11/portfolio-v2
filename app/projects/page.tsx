"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { FaGithub } from "react-icons/fa"
import { HiOutlineDocumentText } from "react-icons/hi2"
import { ArrowRightIcon, FilterIcon, SearchIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

import { projects } from "@/app/projects/projects"
import { blogItems } from "@/app/blog/blog-posts"

const ITEMS_PER_PAGE = 9

const postsBySlug = new Map(blogItems.map((post) => [post.slug, post]))

export default function ProjectsPage() {
  const [query, setQuery] = useState("")
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const badgeOptions = useMemo(() => {
    const categories = Array.from(new Set(projects.map((project) => project.category)))
    const skills = Array.from(
      new Set(projects.flatMap((project) => project.skills))
    ).sort((a, b) => a.localeCompare(b))

    return { categories, skills }
  }, [])

  const toggleBadge = (badge: string) => {
    setSelectedBadges((current) =>
      current.includes(badge)
        ? current.filter((value) => value !== badge)
        : [...current, badge]
    )
  }

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return projects.filter((project) => {
      const matchesSearch =
        !normalizedQuery ||
        [
          project.title,
          project.subtitle,
          project.category,
          project.status,
          project.summary,
          project.details,
          project.skills.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)

      const projectBadges = [project.category, ...project.skills]
      const matchesBadgeFilter =
        selectedBadges.length === 0 ||
        selectedBadges.some((badge) => projectBadges.includes(badge))

      return matchesSearch && matchesBadgeFilter
    })
  }, [query, selectedBadges])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, selectedBadges])

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE))
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Research &amp; Projects
        </h1>

        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>
              <SearchIcon className="size-4" />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search research & projects..."
            aria-label="Search research and projects"
          />

          <InputGroupAddon align="inline-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="relative"
                  aria-label="Filter research and projects by badges"
                >
                  <FilterIcon className="size-4" />
                  {selectedBadges.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {selectedBadges.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <div className="space-y-2 p-2">
                  {badgeOptions.categories.map((category) => {
                    const isChecked = selectedBadges.includes(category)
                    return (
                      <label
                        key={category}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 hover:bg-muted"
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleBadge(category)}
                          aria-label={`Filter by ${category}`}
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    )
                  })}
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Skills</DropdownMenuLabel>
                <div className="max-h-52 space-y-2 overflow-y-auto p-2">
                  {badgeOptions.skills.map((skill) => {
                    const isChecked = selectedBadges.includes(skill)
                    return (
                      <label
                        key={skill}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1 hover:bg-muted"
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleBadge(skill)}
                          aria-label={`Filter by ${skill}`}
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    )
                  })}
                </div>

                {selectedBadges.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedBadges([])}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>
        </InputGroup>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project) => {
            const relatedPost = project.blogSlug
              ? postsBySlug.get(project.blogSlug)
              : undefined

            return (
              <Dialog key={project.title}>
                <DialogTrigger asChild>
                  <button className="cursor-pointer text-left">
                    <Card className="h-full transition-colors hover:bg-muted/30">
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>
                          {project.year}
                          {project.status ? ` • ${project.status}` : ""}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-muted-foreground">
                        {project.summary}
                      </CardContent>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="default">{project.category}</Badge>
                          {project.skills.map((skill) => (
                            <Badge key={`${project.title}-${skill}`} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </DialogTrigger>

                <DialogContent className="p-10 sm:max-w-2xl">
                  <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                      <DialogTitle>{project.title}</DialogTitle>
                      <p className="text-sm text-muted-foreground">{project.year}</p>
                    </div>
                    <DialogDescription>{project.subtitle}</DialogDescription>
                    {project.status && (
                      <p className="text-sm text-muted-foreground">{project.status}</p>
                    )}
                  </DialogHeader>

                  {(project.githubUrl || project.paperUrl) && (
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <FaGithub className="size-5" />
                        </a>
                      )}
                      {project.paperUrl && (
                        <Link
                          href={project.paperUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} paper`}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <HiOutlineDocumentText className="size-5" />
                        </Link>
                      )}
                    </div>
                  )}

                  <p className="text-muted-foreground">{project.details}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">{project.category}</Badge>
                    {project.skills.map((skill) => (
                      <Badge key={`${project.title}-dialog-${skill}`} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {relatedPost && (
                    <div className="space-y-1 border-t pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Blog post
                      </p>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-start gap-1.5 text-sm transition-colors hover:text-muted-foreground"
                      >
                        {relatedPost.title}
                        <ArrowRightIcon className="mt-0.5 size-4 shrink-0" />
                      </Link>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            )
          })}
        </div>

        {filteredProjects.length > ITEMS_PER_PAGE && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1
              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No research or projects found for &quot;{query}&quot;.
          </p>
        )}
      </section>
    </main>
  )
}
