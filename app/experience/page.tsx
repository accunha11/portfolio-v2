 "use client"

import { useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"

function CollapsibleExperienceCard({
  organization,
  position,
  date,
  children,
}: {
  organization: string
  position: string
  date: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} className="group/collapsible">
      <Card
        className="rounded-none bg-transparent ring-0 transition-colors hover:bg-muted/30"
      >
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{organization}</CardTitle>
            <p className="text-sm">{position}</p>
            <CardDescription>{date}</CardDescription>
          </div>
          <button
            type="button"
            aria-label={
              isOpen
                ? `Collapse details for ${organization}`
                : `Expand details for ${organization}`
            }
            onClick={(event) => {
              event.stopPropagation()
              setIsOpen((previous) => !previous)
            }}
            className="mt-0.5 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronDownIcon className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </button>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>{children}</CardContent>
        </CollapsibleContent>
      </Card>
      <div className="mx-4 h-px bg-border/70 group-last/collapsible:hidden" />
    </Collapsible>
  )
}

export default function ExperiencePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8">
        <section className="space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Professional Experience
          </h1>

          <div className="space-y-0 rounded-xl ring-1 ring-foreground/10">
          <CollapsibleExperienceCard
            organization="BMW"
            position="AI Engineer - Working Student"
            date="January 2026 - Present"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Enabling faster safety validation for vehicle testing for 30+
                  team members by building a full-stack AI agent that
                  translates complex requirement data into accurate, queryable
                  insights.
                </li>
                <li>
                  Leading rollout of a company-wide testing platform expected
                  to scale to 100+ engineers by deploying on BMW&apos;s internal
                  infrastructure and building modular MCP tools (including
                  agent-based tools) for extensibility.
                </li>
                <li>
                  Improving traceability of feature dependencies and safety
                  requirements by designing a Neo4j knowledge graph capturing
                  semantic relationships across ingested documents and available
                  data.
                </li>
                <li>
                  Increasing response accuracy for safety-critical queries by
                  implementing a RAG pipeline with vector search, structured
                  context retrieval, and advanced prompt engineering for LLM
                  outputs.
                </li>
              </ul>
          </CollapsibleExperienceCard>

          <CollapsibleExperienceCard
            organization="BMW"
            position="Software Engineer - Internship"
            date="May 2025 - September 2025"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Supported AI-based localization for autonomous vehicles by
                  integrating sensor data used for lane boundary extraction into
                  internal fingerprint pipeline using Python.
                </li>
                <li>
                  Worked in a cloud-based environment using AWS services for
                  data storage and processing.
                </li>
                <li>
                  Collaborated with other engineers to translate data
                  requirements into engineering solutions while adhering to
                  confidentiality protocols.
                </li>
              </ul>
          </CollapsibleExperienceCard>

          <CollapsibleExperienceCard
            organization="Inscribe AI"
            position="Software Engineer II"
            date="November 2024 - April 2025"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Doubled functionality for the AI compliance agent by adding
                  new NLP-powered RAG-based compliance checks using Python,
                  Django, and AWS Bedrock.
                </li>
                <li>
                  Improved LLM retrieval accuracy by 7.5% by designing a
                  precision-recall balancing technique to eliminate incorrect
                  results while preserving relevant data.
                </li>
                <li>
                  Aligned system capabilities with client requirements by
                  participating in customer calls to discuss expectations for
                  compliance analyst POCs.
                </li>
                <li>
                  Part of the foundational team for the AI compliance analyst,
                  contributing to the design and implementation of core
                  features.
                </li>
              </ul>
          </CollapsibleExperienceCard>

          <CollapsibleExperienceCard
            organization="Attentive"
            position="Software Engineer"
            date="August 2022 - September 2023"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Expedited operations within the Client Strategy team by 50%
                  by building new client-facing features using React,
                  TypeScript, Java, and SQL.
                </li>
                <li>
                  Optimized the MOPS team&apos;s access to client data by 87.5%
                  through upgrading internal tools with Python, Airflow, and
                  automated data pipelines.
                </li>
                <li>
                  Improved client data security by migrating 10+ services in AWS
                  using DynamoDB and SQL, ensuring compliance with data
                  protection protocols.
                </li>
              </ul>
          </CollapsibleExperienceCard>

          <CollapsibleExperienceCard
            organization="Attentive"
            position="Software Engineer - Internship"
            date="June 2021 - July 2022"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Revamped legacy client UI, modernizing it into a scalable web
                  application and REST API using React, TypeScript, Java, and
                  SQL, enhancing user experience.
                </li>
                <li>
                  Simplified testing of end-to-end webhooks for clients by
                  implementing new functionality in the backend using Java and
                  integrating continuous testing automation.
                </li>
              </ul>
          </CollapsibleExperienceCard>

          <CollapsibleExperienceCard
            organization="Center of Global Justice at University of California - San Diego"
            position="STEAM Education Intern"
            date="January 2020 - September 2021"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Provided technology education to 35+ children in Tijuana,
                  Mexico by developing a computer literacy program.
                </li>
                <li>
                  Enabled access to technology to 500+ community members in
                  Tijuana through repurposing the university&apos;s e-waste.
                </li>
              </ul>
          </CollapsibleExperienceCard>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Social Engagement
          </h2>

          <div className="space-y-0 rounded-xl ring-1 ring-foreground/10">
          <CollapsibleExperienceCard
            organization="BRASA Munique"
            position="Board Member"
            date="September 2025 - Present"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Creating a supportive environment for Brazilian students
                  abroad by developing events and group activities, as well as
                  providing academic support for newcomers.
                </li>
              </ul>
          </CollapsibleExperienceCard>

          <CollapsibleExperienceCard
            organization="Women in CS"
            position="Member"
            date="May 2025 - Present"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Supporting women pursuing an education in computer science by
                  contributing to the development of events.
                </li>
              </ul>
          </CollapsibleExperienceCard>

          <CollapsibleExperienceCard
            organization="Attentive Women Engineers, Attentive"
            position="Recruitment Board"
            date="January 2023 - September 2023"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Fostered diversion and inclusion within the company by
                  collaborating with the recruiting team to create events that
                  increased women applicants in engineering.
                </li>
              </ul>
          </CollapsibleExperienceCard>

          <CollapsibleExperienceCard
            organization="Girls Who Code, University of California - San Diego Chapter"
            position="Vice President of Web Development"
            date="June 2021 - June 2022"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Enhanced outreach and technical skills for members by creating
                  a club website and workshops to teach web development.
                </li>
              </ul>
          </CollapsibleExperienceCard>

          <CollapsibleExperienceCard
            organization="Association for Computing Machinery, University of California - San Diego Chapter"
            position="Team Mentor"
            date="September 2021 - January 2022"
          >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                  Mentored a team in Agile development practices, guiding them
                  through tools and instructional material to successfully
                  complete their React project within the timeline.
                </li>
              </ul>
          </CollapsibleExperienceCard>
          </div>
        </section>
      </div>
    </main>
  )
}
