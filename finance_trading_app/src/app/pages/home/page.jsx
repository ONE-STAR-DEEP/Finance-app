'use client';

import AppHeader from "@/components/app-header";
import { SoftGridBackground } from "@/components/softBackground";
import StockGrid from "@/components/stock-grid";
import TotalAssets from "@/components/tatal-assets";
import { useEffect, useState } from "react";

export default function MyComponent() {
    const [currentUser, setCurrentUser] = useState();
    const [name, setName] = useState("");

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
            } catch (err) {
                console.error(err);
                setCurrentUser(null);
            }
        }

        fetchMe();
    }, []);

    return (
        <SoftGridBackground>
            <div className="min-h-screen bg-background/80 text-foreground overflow-x-hidden">
                <AppHeader />

                <main className="py-10">
                    <div className="mx-auto w-full max-w-6xl px-4">
                        <header className="mb-6">
                            <h1 className="text-3xl font-bold text-balance">Welcome, {name}</h1>
                            <p className="text-muted-foreground">
                                Here’s your personalized dashboard. Explore trending stocks.
                            </p>
                        </header>
                    </div>

                    <StockGrid />
                </main>
            </div>
        </SoftGridBackground>
    );
}
