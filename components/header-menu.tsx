"use client"

import Link from "next/link"
import { MailIcon } from "lucide-react"
import { FaGithub } from "react-icons/fa"

import LinkedinIcon from "@/components/icons/linkedin-icon"
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
]

export function HeaderMenu() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Menubar className="h-auto gap-2 rounded-none border-0 bg-transparent p-0 shadow-none">
        {navItems.map((item) => (
          <MenubarMenu key={item.href}>
            <MenubarTrigger
              asChild
              className="text-foreground transition-colors hover:!bg-black/10 dark:hover:!bg-white/15 hover:text-foreground aria-expanded:!bg-transparent data-[state=open]:!bg-transparent"
            >
              <Link href={item.href}>{item.label}</Link>
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>

      <div className="flex items-center gap-3">
        <a
          href="https://www.linkedin.com/in/ana-cunha1/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <LinkedinIcon size={16} color="currentColor" />
        </a>
        <a
          href="mailto:anacrcunha00@gmail.com"
          aria-label="Send email"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <MailIcon className="size-5" />
        </a>
        <a
          href="https://github.com/accunha11"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <FaGithub className="size-5" />
        </a>
      </div>
    </div>
  )
}
