import Link from "next/link"
import { SoftGridBackground } from "@/components/softBackground"
import SignupForm from "@/components/signup-form"


export default function SignUpPage() {
  return (
    <main className="relative min-h-screen">
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
            <h1 className="text-3xl md:text-4xl font-semibold text-balance">Sign up to the Finance Trading App</h1>
            <p className="mt-3 text-muted-foreground text-pretty">
              Join us today and take control of your financial future.
            </p>
          </div>
          <SignupForm />
        </div>
      </section>
    </main>
  )
}
