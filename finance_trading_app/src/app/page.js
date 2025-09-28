import { SoftGridBackground } from "@/components/softBackground";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <SoftGridBackground>
      <header className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]/80 px-4 py-3">
          <span className="text-balance text-lg font-semibold">Finance app</span>
          <Link href="/pages/login">
            <Button className="rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90">
              Sign in
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-4xl place-items-center px-6 py-20 text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
          Welcome to the Finance Trading App
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)] md:text-lg">
          Your one‑stop solution for managing and trading your financial assets with ease and efficiency.
        </p>
        <p className="mt-3 text-[var(--color-muted-foreground)]">Get Rs. 100,000 as bonus for opening an account</p>
        <div className="mt-6">
          <Link href="/pages/signup">
            <Button className="rounded-full bg-[var(--color-primary)] px-6 py-5 text-[var(--color-primary-foreground)] hover:opacity-90">
              Open an Account
            </Button>
          </Link>
        </div>
      </main>
    </SoftGridBackground>

  );
}
