"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function SignupForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();  

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const password = form.password.value

    if (!email || !password) {
      alert("Please enter email and password")
      return
    }
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: name,
            email: email,
            password: password

          })
        })
      if (response.ok) {

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

            router.push('/pages/kyc')
          }
        } catch (error) {
          console.log(error);
        }

      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md bg-card/90 backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl text-balance">Welcome</CardTitle>
        <CardDescription className="text-pretty">
          Register today and get access to real-time trading insights!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="ABC" autoComplete="name" required />
          </div>
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
            {loading ? "Signing up…" : "Sign up"}
          </Button>
        </form>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          By signing up, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end text-sm text-muted-foreground">
        <div>
          Already Registered?{" "}
          <Link href="/pages/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
