import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import CarolPhoto from "@/components/Carol.jpg"

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <section
        id="about"
        className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10"
      >
        <Image
          src={CarolPhoto}
          alt="Portrait of Ana Carolina Cunha"
          className="mx-auto size-44 shrink-0 rounded-full object-cover md:mx-0"
          priority
        />

        <div className="space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ana Carolina Cunha
          </h1>

          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Hi, I&apos;m Ana. I&apos;m an AI engineer at BMW, building language model
              systems over engineering data. The work I care about most is
              research, mostly on how these models fail and what their internals
              represent.
            </p>
            <p>
              I studied Cognitive Science at UC San Diego, specializing in
              machine learning and neural networks, and I&apos;m finishing a
              Master&apos;s in Informatics at TUM. Recent work has been on credit
              assignment in reasoning models, evaluation robustness for medical
              LLMs, and unsupervised structure in genome models.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-1 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide">
                Latest Experience
              </p>
              <p className="text-sm">
                AI Engineer - Working Student at BMW
              </p>
              <Link
                href="/experience"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View experience
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide">
                Latest Research
              </p>
              <div className="space-y-1 text-sm">
                <p>Master–Novice Divergence for Reward Densification</p>
                <p>Prompt Optimization in Medical LLM Benchmarks</p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View research &amp; projects
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
