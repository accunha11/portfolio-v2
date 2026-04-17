import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { HeaderMenu } from "@/components/header-menu"
import { cn } from "@/lib/utils"

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <div className="min-h-svh">
            <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/95 px-6 py-4 backdrop-blur">
              <HeaderMenu />
            </header>
            <div className="pt-20">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
