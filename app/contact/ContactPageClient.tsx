"use client"

import type React from "react"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPageClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("success")
      e.currentTarget.reset()
    } catch (e) {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-neutral-700">We usually respond within 24 hours.</p>
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Your full name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required placeholder="How can we help?" rows={6} />
            </div>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </Button>
            {status === "success" ? (
              <p className="text-emerald-700">Thanks! Your message has been sent.</p>
            ) : status === "error" ? (
              <p className="text-red-600">Something went wrong. Please try again.</p>
            ) : null}
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
