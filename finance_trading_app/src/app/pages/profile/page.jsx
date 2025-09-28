'use client'

import { SoftGridBackground } from "@/components/softBackground"
import StockCard from "@/components/stock-card";
import TotalAssets from "@/components/tatal-assets";
import { Button } from "@/components/ui/button";
import { set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [SAMPLE_STOCKS, setSAMPLE_STOCKS] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await res.json();
        console.log("Logged-in user:", user);
        setCurrentUser(user);
        setName(user.username);
        setId(user._id);
      } catch (err) {
        console.error(err);
        setCurrentUser(null);
      }
    }

    fetchMe();
  }, []);

  useEffect(() => {
  if (!id) return;

  async function fetchOrders() {
    try {
      const res = await fetch(`http://localhost:5000/api/buy/orders/user/${id}`, {
        method: "GET",
      });
      if (!res.ok) throw new Error("Failed to fetch user orders");

      const data = await res.json();
      setSAMPLE_STOCKS(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  fetchOrders();
}, [id]);


  return (
    <SoftGridBackground>
      <div className="min-h-screen bg-background/80 text-foreground overflow-x-hidden">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="mx-auto w-full max-w-6xl px-4">
            <nav className="flex h-14 items-center justify-between">
              <div className="flex items-center gap-2 cursor-default">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-xl font-semibold tracking-tight text-foreground">Finance App</span>
              </div>

              <div className="flex items-center gap-3">
                <Button asChild variant="default" className="rounded-full">
                  <Link href="/pages/home">Home</Link>
                </Button>
              </div>
            </nav>
          </div>
          <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </header>

        <main className="py-10">
          <div className="mx-auto w-full max-w-6xl px-4">
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-balance">Welcome {name}</h1>
              <p className="text-muted-foreground">
                This is your profile page. You can view and manage your portfolio here.
              </p>
            </header>

            <section className="mb-8">
              <TotalAssets amount={100000} deltaPct={2.3} />
            </section>
          </div>

          <section aria-labelledby="stocks-heading" className="mx-auto w-full max-w-6xl px-4">
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 id="stocks-heading" className="text-sm font-semibold text-muted-foreground">
                    Your Stocks
                  </h2>
                  <span className="text-xs text-muted-foreground/80">{SAMPLE_STOCKS.length} bought</span>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {SAMPLE_STOCKS.map((s) => (
                    <StockCard key={s._id} {...s} />
                  ))}
                </div>
              </section>
        </main>
      </div>
    </SoftGridBackground>
  )
}
