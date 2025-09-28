"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const email = form.email.value.trim()
    const password = form.password.value

    if (!email || !password) {
      alert("Please enter email and password")
      return
    }
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
      if (response.ok) {
        const data = await response.json();

        console.log(data)

        router.push('/pages/home')
      }
    } catch (err) {
      console.log("Login error:", err)
      alert("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-card/90 backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl text-balance">Welcome back</CardTitle>
        <CardDescription className="text-pretty">Sign in to manage your finances and trades.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <Link href="#" className="hover:underline">
          Forgot password?
        </Link>
        <div>
          New here?{" "}
          <Link href="/pages/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
