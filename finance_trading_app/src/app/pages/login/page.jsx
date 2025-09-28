import Link from "next/link"
import LoginForm from "@/components/login-form"
import { SoftGridBackground } from "@/components/softBackground"


export default function LoginPage() {
  return (
    <main className="relative min-h-screen">
      {/* Clip any off-screen glow layers to prevent scrollbars */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <SoftGridBackground />
      </div>

      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link href="/" className="font-semibold text-lg">
          Finance app
        </Link>
        <Link
          href="/"
          className="rounded-full px-4 py-2 border bg-background text-foreground hover:bg-muted transition"
        >
          Home
        </Link>
      </header>

      <section className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-8 py-12 md:py-20">
          <div className="text-center max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-semibold text-balance">Sign in to the Finance Trading App</h1>
            <p className="mt-3 text-muted-foreground text-pretty">
              Securely access your portfolio and start trading with confidence.
            </p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
