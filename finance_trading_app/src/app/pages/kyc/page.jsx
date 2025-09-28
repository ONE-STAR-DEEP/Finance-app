import KycForm from "@/components/ky-form";


export default function KycPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <section className="mx-auto w-full max-w-2xl px-4 py-10 md:py-12">
        <header className="mb-6">
          <h1 className="text-balance text-2xl font-semibold tracking-tight">Complete your KYC</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Enter your PAN, ID number, and upload an ID image to proceed.
          </p>
        </header>

        <KycForm />
      </section>
    </main>
  )
}
