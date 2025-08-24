"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { categories } from "@/lib/data"
import { useState } from "react"

export function SiteHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [q, setQ] = useState<string>(searchParams.get("q") || "")

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Yatanz</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 grid gap-2">
                <SheetClose asChild>
                  <Link href="/" className="px-3 py-2 rounded-md hover:bg-neutral-100">
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/products" className="px-3 py-2 rounded-md hover:bg-neutral-100">
                    Products
                  </Link>
                </SheetClose>
                <div className="mt-4">
                  <p className="px-3 text-sm font-medium text-neutral-600">Categories</p>
                  <div className="mt-2 grid">
                    {categories.map((c) => (
                      <SheetClose asChild key={c.slug}>
                        <Link
                          href={`/categories/${c.slug}`}
                          className="px-3 py-2 rounded-md hover:bg-neutral-100 text-sm"
                        >
                          {c.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid gap-2">
                  <SheetClose asChild>
                    <Link href="/about" className="px-3 py-2 rounded-md hover:bg-neutral-100">
                      About
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/contact" className="px-3 py-2 rounded-md hover:bg-neutral-100">
                      Contact
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="font-bold text-lg md:text-xl tracking-tight">
            Yatanz: Chaos to Class
          </Link>
        </div>

        <form onSubmit={submitSearch} className="relative hidden md:block md:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" aria-hidden />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="pl-9"
            aria-label="Search products"
          />
          {q ? (
            <button
              type="button"
              onClick={() => setQ("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </form>

        <nav className="hidden lg:flex items-center gap-4">
          <Link href="/products" className="text-neutral-700 hover:text-neutral-900">
            Products
          </Link>
          <div className="relative group">
            <button className="text-neutral-700 hover:text-neutral-900" aria-haspopup="true" aria-expanded="false">
              Categories
            </button>
            <div
              className="absolute right-0 mt-2 w-[520px] rounded-lg border bg-white shadow-lg p-4 grid grid-cols-2 gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
              role="menu"
            >
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-neutral-50"
                  role="menuitem"
                >
                  <Image
                    src={c.image || "/placeholder.svg"}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-md border object-cover"
                  />
                  <span className="text-sm">{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/about" className="text-neutral-700 hover:text-neutral-900">
            About
          </Link>
          <Link href="/contact" className="text-neutral-700 hover:text-neutral-900">
            Contact
          </Link>
          <div className="flex items-center gap-3 ml-4 border-l pl-4">
            <a
              href="https://instagram.com/yatanz_official"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="hover:scale-110 transition-transform duration-200"
            >
              <Image src="/icons/instagram.png" alt="Instagram" width={20} height={20} />
            </a>
            <a
              href="https://amazon.in/stores/yatanz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Amazon Store"
              className="hover:scale-110 transition-transform duration-200"
            >
              <Image src="/icons/amazon.png" alt="Amazon" width={20} height={20} />
            </a>
            <a
              href="https://flipkart.com/stores/yatanz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Flipkart Store"
              className="hover:scale-110 transition-transform duration-200"
            >
              <Image src="/icons/flipkart.png" alt="Flipkart" width={20} height={20} />
            </a>
          </div>
        </nav>

        <form onSubmit={submitSearch} className="ml-auto md:hidden">
          <Button variant="outline" size="icon" aria-label="Search">
            <Search className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </header>
  )
}
