'use client';

import { useEffect, useState } from "react";
import StockCard from "./stock-card"

const STOCKS = [
  { ticker: "AAPL", name: "Apple", price: "228.34", change: "1.24" },
  { ticker: "MSFT", name: "Microsoft", price: "432.19", change: "0.87" },
  { ticker: "GOOGL", name: "Alphabet", price: "176.22", change: "-0.35" },
  { ticker: "AMZN", name: "Amazon", price: "189.77", change: "1.02" },
  { ticker: "TSLA", name: "Tesla", price: "248.06", change: "-2.15" },
  { ticker: "NVDA", name: "NVIDIA", price: "122.44", change: "3.62" },
  { ticker: "META", name: "Meta", price: "512.90", change: "0.21" },
  { ticker: "JPM", name: "JPMorgan", price: "208.15", change: "-0.48" },
]

export default function StockGrid() {
  const [stocks, setStocks] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
        async function fetchMe() {
            try {
                const res = await fetch("http://localhost:5000/api/auth/me", {
                    method: "GET",
                    credentials: "include", // <-- must include cookies
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch user");
                }

                const user = await res.json();
                console.log("Logged-in user:", user);
                setCurrentUser(user._id); // store user in state
            } catch (err) {
                console.error(err);
                setCurrentUser(null);
            }
        }

        fetchMe();
    }, []);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("http://localhost:5000/api/stocks", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        console.log("Logged-in user:", data);
        setStocks(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMe();
  }, []);

  return (
    <section aria-labelledby="stocks-heading" className="mx-auto w-full max-w-6xl px-4">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 id="stocks-heading" className="text-sm font-semibold text-muted-foreground">
          Market Snapshot
        </h2>
        <span className="text-xs text-muted-foreground/80">{stocks.length} available stocks</span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stocks.map((s) => (
          <StockCard key={s._id} {...s} userid={currentUser} />
        ))}
      </div>
    </section>
  )
}
