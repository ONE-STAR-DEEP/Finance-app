import { cn } from "@/lib/utils"

export function SoftGridBackground({ className, children }) {
  return (
    <div className={cn("relative isolate min-h-dvh bg-background overflow-hidden", className)}>
      {/* Grid overlay (subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          maskImage: "radial-gradient(70% 60% at 50% 40%, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, black 60%, transparent 100%)",
        }}
      >
        <svg className="h-full w-full text-[var(--color-muted-foreground)]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Primary soft glows (very subtle, token-driven) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "color-mix(in oklch, var(--color-primary) 18%, transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-8rem] right-[-8rem] -z-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "color-mix(in oklch, var(--color-primary) 12%, transparent)" }}
      />

      {/* Content */}
      {children}
    </div>
  )
}
