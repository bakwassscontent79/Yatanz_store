"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Instagram, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { categories } from "@/lib/data"
import { useState } from "react"
import FlipkartIcon from "./icon/Flipkart"

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
              <Instagram />
            </a>
            <a
              href="https://amazon.in/stores/yatanz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Amazon Store"
              className="hover:scale-110 transition-transform duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                fill={"currentColor"} viewBox="0 0 24 24">
                {/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
                <path d="M2.027 17.023q.09-.147.289-.02c3.035 1.76 6.338 2.645 9.906 2.645 2.381 0 4.73-.447 7.051-1.332l.262-.117c.115-.051.195-.084.244-.109.189-.074.326-.037.438.109.102.143.076.279-.1.4-.213.158-.5.342-.84.545q-1.557.927-3.492 1.441a14.8 14.8 0 0 1-3.77.508q-2.834 0-5.369-.99a14.9 14.9 0 0 1-4.531-2.797q-.125-.092-.125-.184.002-.058.041-.109zm5.479-5.189q0-1.258.619-2.152c.414-.592.977-1.041 1.703-1.346.666-.281 1.465-.48 2.43-.602q.49-.056 1.6-.145v-.31c0-.773-.084-1.299-.248-1.564-.252-.359-.65-.541-1.203-.541h-.15c-.4.039-.746.162-1.039.383a1.5 1.5 0 0 0-.564.916c-.049.25-.172.387-.361.426l-2.105-.264c-.209-.051-.311-.15-.311-.326 0-.037.006-.074.018-.123q.313-1.618 1.52-2.404c.814-.514 1.752-.814 2.828-.875h.451c1.379 0 2.469.361 3.244 1.076.115.123.227.25.34.398.1.139.188.264.234.377.063.111.127.275.164.475.051.213.088.352.113.426.023.086.051.25.064.514.006.262.016.41.016.461v4.406c0 .314.049.602.137.865.088.26.174.451.262.563l.428.561a.6.6 0 0 1 .111.303q0 .153-.148.26c-1.002.877-1.553 1.352-1.639 1.428q-.206.169-.525.039a5 5 0 0 1-.439-.414l-.258-.291c-.051-.063-.141-.174-.266-.352l-.25-.363c-.676.74-1.338 1.205-2.002 1.393-.414.125-.914.188-1.529.188-.926 0-1.701-.285-2.303-.863-.598-.576-.9-1.389-.9-2.453l-.043-.063zm3.131-.367q-.001.71.355 1.139c.236.285.563.428.965.428q.052-.001.16-.018c.078-.012.111-.02.141-.02.512-.133.902-.461 1.189-.982a2.6 2.6 0 0 0 .299-.758c.076-.268.1-.494.111-.666.016-.166.016-.453.016-.84v-.451q-1.056 0-1.604.148c-1.063.303-1.604.977-1.604 2.029l-.029-.016zm7.646 5.865c.025-.051.063-.092.109-.143.301-.201.596-.342.877-.416a6.6 6.6 0 0 1 1.344-.201q.177-.014.346.025c.539.051.873.141.977.273.053.078.074.191.074.328v.125q0 .638-.348 1.502c-.348.864-.553 1.041-.963 1.402q-.091.074-.164.074c-.025 0-.051 0-.074-.01-.076-.037-.09-.1-.055-.201.451-1.051.672-1.787.672-2.201 0-.127-.025-.227-.074-.289-.119-.137-.457-.217-1.02-.217a9 9 0 0 0-.727.039q-.455.06-.834.115-.11-.001-.15-.037c-.025-.025-.031-.039-.018-.064 0-.014.006-.025.018-.053v-.049z"></path>
              </svg>
            </a>
            <a
              href="https://flipkart.com/stores/yatanz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Flipkart Store"
              className="hover:scale-110 transition-transform duration-200"
            >
              <FlipkartIcon />
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
