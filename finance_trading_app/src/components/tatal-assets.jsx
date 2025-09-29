import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TotalAssets({ amount = 125430.22, deltaPct = 2.3, balance, bonus  }) {
  console.log(balance, bonus);
  const up = Number(deltaPct) >= 0
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount)

  return (
    <Card className="border-border/80 bg-background/60 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-4 pb-4">
        <p className="text-3xl font-semibold leading-none tracking-tight">{formatted}</p>
        <span
          className={[
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            up ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400",
          ].join(" ")}
          aria-label={up ? "Positive change" : "Negative change"}
          title={`${up ? "+" : ""}${deltaPct}% vs. yesterday`}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className={`mr-1 h-3.5 w-3.5 ${up ? "" : "rotate-180"}`}
          >
            <path d="M10 3l6 6H4l6-6zm0 14a1 1 0 01-1-1V7h2v9a1 1 0 01-1 1z" />
          </svg>
          {up ? "+" : ""}
          {deltaPct}%
        </span>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        <p>Balance:{balance}</p>
        <p>Bonus:{bonus}</p>
      </CardFooter>
    </Card>
  )
}
