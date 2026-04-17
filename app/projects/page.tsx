"use client"

import { useMemo, useState } from "react"
import { FaGithub } from "react-icons/fa"
import { HiOutlineDocumentText } from "react-icons/hi2"
import { FilterIcon, SearchIcon } from "lucide-react"

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

type Project = {
  title: string
  subtitle: string
  category: "Research" | "Personal Project" | "University Project"
  year: "2026" | "2025" | "2024"
  status?: "In progress"
  summary: string
  details: string
  skills: string[]
  githubUrl?: string
  paperUrl?: string
}

const projects: Project[] = [
  {
    title: "Increasing Reward Quality & Density for Verifiable Rewards",
    subtitle: "Research Project",
    category: "Research",
    year: "2026",
    status: "In progress",
    summary:
      "Exploring methods to improve reward quality and density for more reliable optimization in verifiable reward settings.",
    details:
      "This project investigates how to design and evaluate denser, higher-quality reward signals for verifiable reward tasks. The focus is on improving stability, reducing sparse-feedback bottlenecks, and enabling stronger alignment between optimization objectives and measured performance.",
    skills: [
      "Machine Learning & AI",
      "Model Evaluation",
      "Reasoning & Reliability",
      "Python",
    ],
  },
  {
    title: "Prompt optimization in medical llm benchamarks",
    subtitle: "Research Project",
    category: "Research",
    year: "2026",
    status: "In progress",
    summary:
      "Improving medical LLM benchmark performance through systematic prompt optimization and reliability-oriented evaluation.",
    details:
      "This project focuses on prompt optimization strategies for medical LLM benchmarks, with emphasis on consistency, robustness, and trustworthy evaluation. The goal is to identify prompt patterns that improve task performance while preserving reliability in sensitive medical contexts.",
    skills: [
      "LLM Systems",
      "Model Evaluation",
      "Reasoning & Reliability",
      "Python",
    ],
  },
  {
    title: "Oversmoothing in Deep Graph Neural Networks",
    subtitle:
      "Research with TUM School of Computation, Information and Technology",
    category: "Research",
    year: "2026",
    summary:
      "Investigated why deep GNNs lose performance at depth and found training dynamics drive oversmoothing more than architecture limits.",
    details:
      "Investigated the root causes of oversmoothing in deep graph neural networks by reproducing and extending prior work across multiple architectures and benchmark datasets. Through this analysis, found that performance degradation at depth is driven primarily by training dynamics rather than architectural limitations, with sparse untrained subnetworks remaining stable even beyond 20 layers. Further explored mitigation strategies such as graph sparsification and weight reparameterization, showing that controlling how weights evolve is key to preserving representation diversity.",
    skills: ["Machine Learning & AI", "Model Evaluation", "PyTorch", "TensorFlow"],
    githubUrl: "https://github.com/accunha11/practical-gnn",
    paperUrl: "/pdfs/Oversmoothing Report.pdf",
  },
  {
    title: "AI Fashion Assistant with Virtual Try-On",
    subtitle: "Group Project for Generative AI Class",
    category: "University Project",
    year: "2026",
    summary:
      "Built a full-stack AI fashion assistant that recommends outfits from existing wardrobes and visualizes looks with virtual try-on.",
    details:
      "Personalized outfit recommendations based on users' existing wardrobes by building a full-stack AI fashion assistant that generates looks and visualizes them through virtual try-on.",
    skills: [
      "Machine Learning & AI",
      "LLM Systems",
      "Python",
      "JavaScript/TypeScript",
    ],
    githubUrl: "https://github.com/luckyLacchin/FashionAIStylist",
  },
  {
    title: "NL2SQL AI Agent for Manufacturing Data",
    subtitle: "Interdisciplinary Project with TUM's IWB department",
    category: "University Project",
    year: "2026",
    summary:
      "Enabled natural language access to manufacturing databases using an NL2SQL agent with validation, execution, and conversational memory.",
    details:
      "Enabled natural language querying of manufacturing databases by building an NL2SQL AI agent (Python, LangGraph, React) that generates, validates, and executes SQL queries with conversational memory.",
    skills: [
      "LLM Systems",
      "LangGraph",
      "Python",
      "SQL",
    ],
    paperUrl: "/pdfs/NL2SQL Report.pdf",
  },
  {
    title: "3D Face Reconstruction",
    subtitle: "Group Project for 3D Scanning and Motion Capture Class",
    category: "University Project",
    year: "2025",
    summary:
      "Created a Python-based 3D reconstruction pipeline that recovers facial geometry from one 2D image with BFM and FLAME models.",
    details:
      "Built a 3D face reconstruction pipeline using Python to recover facial geometry from a single 2D image using both BFM and FLAME morphable models. Implemented an energy-based optimization framework incorporating sparse landmark alignment, dense photometric consistency, and regularization terms to refine shape and expression parameters.",
    skills: ["Machine Learning & AI", "Model Evaluation", "Python"],
    githubUrl: "https://github.com/Nils19/Face_Reconstruction",
    paperUrl: "/pdfs/3D Face Report.pdf",
  },
  {
    title: "MedSearch",
    subtitle: "Personal Project",
    category: "Personal Project",
    year: "2025",
    summary:
      "Developed a web app that helps users find medically accurate information and generate structured reports with AI support.",
    details:
      "Helped users research medically accurate information and generate structured reports by developing a web-app using React and Perplexity API. Applied prompt engineering techniques to optimize AI query accuracy and consistency.",
    skills: [
      "LLM Systems",
      "RAG",
      "Reasoning & Reliability",
      "JavaScript/TypeScript",
    ],
    githubUrl: "https://github.com/accunha11/medsearch",
  },
  {
    title: "AnaGPT",
    subtitle: "Personal Project",
    category: "Personal Project",
    year: "2024",
    summary:
      "Built a ChatGPT-style app with real-time conversation, authentication, and state management using React and Node.js.",
    details:
      "Developed a ChatGPT clone using React, Node.js, and the OpenAI API to simulate real-time conversational AI, integrating user authentication and state management.",
    skills: ["LLM Systems", "JavaScript/TypeScript"],
    githubUrl: "https://github.com/accunha11/ana-gpt",
  },
  {
    title: "Platformer Game",
    subtitle: "Personal Project",
    category: "Personal Project",
    year: "2024",
    summary: "Built a platformer game in Python using the Pygame library.",
    details: "Built a platformer game by leveraging the Pygame library in Python.",
    skills: ["Python"],
    githubUrl: "https://github.com/accunha11/python-platformer-game",
  },
]

export default function ProjectsPage() {
  const [query, setQuery] = useState("")
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])

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

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects
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
            placeholder="Search projects..."
            aria-label="Search projects"
          />

          <InputGroupAddon align="inline-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="relative"
                  aria-label="Filter projects by badges"
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
          {filteredProjects.map((project) => (
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
                      <a
                        href={project.paperUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} paper`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <HiOutlineDocumentText className="size-5" />
                      </a>
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
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No projects found for &quot;{query}&quot;.
          </p>
        )}
      </section>
    </main>
  )
}
