import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto w-full max-w-6xl px-4">
        <nav className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 cursor-default">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-xl font-semibold tracking-tight text-foreground">Finance App</span>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="default" className="rounded-full">
              <Link href="/pages/profile">Profile</Link>
            </Button>
          </div>
        </nav>
      </div>
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </header>
  )
}
